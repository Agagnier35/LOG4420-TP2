$("#publications-link").addClass("active");

const deletePublication = id => {
  $("div[data-id=" + id + "]")
    .parents("tr")
    .first()
    .remove();
};

const addAuthor = () => {
  const authorinputs = $(".author-input");
  const name = `Author[${authorinputs.length}]`;

  const authorWrapper = $("<div/>");

  const authorInput = $("<div/>", { class: "author-input" });
  const newAuthor = $("<input/>", {
    type: "text",
    placeholder: "Auteurs",
    name,
    minlength: "5",
    required: true
  });
  authorInput.append(newAuthor);

  const removeButton = $("<div/>", {
    html: '<i class="fa fa-minus fa-3x"/>',
    class: "remove-author",
    onClick: `removeAuthor('${name}')`
  });
  authorWrapper.append(authorInput);
  authorWrapper.append(removeButton);

  authorWrapper.insertBefore($(".add-author"));
};

const removeAuthor = name => {
  $(`input[name="${name}"]`)
    .parent()
    .parent()
    .remove();
};

const initPublications = () => {
  const urlparams = new URLSearchParams(window.location.search);
  const sort = urlparams.get("sort_by");
  const order = urlparams.get("order_by");
  const limit = urlparams.get("limit");
  const page = urlparams.get("page");

  if (sort) {
    $("#fieldFilterSection").val(sort);
  }
  if (order) {
    $("#filterAscValueSection").val(order);
  }
  if (limit) {
    $("#elementsPerPageSection").val(limit);
  }
  if (page) {
    $(`a.pagination-link[data-pagenumber!="${page}"]`).removeClass("active");
    $(`a.pagination-link[data-pagenumber="${page}"]`).addClass("active");
  } else {
    $(`a.pagination-link[data-pagenumber="1"]`).addClass("active");
  }
};

$("#fieldFilterSection").change(e => goto("sort_by", e.currentTarget.value));

$("#filterAscValueSection").change(e =>
  goto("order_by", e.currentTarget.value)
);

$("#elementsPerPageSection").change(e => goto("limit", e.currentTarget.value));

$("a.pagination-link").click(e => {
  const url = new URL(window.location);
  const page = parseInt(url.searchParams.get("page"), 10);
  const elem = e.toElement;

  const pageNumber = elem.getAttribute("data-pagenumber");
  if (pageNumber) {
    goto("page", pageNumber);
  } else if (page) {
    //prev or next was clicked, works if url page was set
    if (elem.classList.contains("previous")) {
      goto("page", page > 1 ? page - 1 : 1);
    } else if (elem.classList.contains("next")) {
      goto("page", page < 3 ? page + 1 : 3);
    }
  }
});

const goto = (query, value) => {
  const url = new URL(window.location);
  url.searchParams.set(query, value);
  if (query !== "page") {
    url.searchParams.set("page", 1);
  }
  const newUrl = url.toString();
  //window.history.pushState({ path: newUrl }, "", newUrl);
  window.location.href = newUrl;
  initPublications();
};

initPublications();
