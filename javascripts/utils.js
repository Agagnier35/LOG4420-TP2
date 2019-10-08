/**
 * Génère un objet représentant un compteur en utilisant les fermetures de Javascript.
 * À partir d'une valeur initiale, chaque appel à la fonction incrémenter
 * cette valeur et la renvoie.
 *
 * @example
 * compteur = genererCompteur(1) // Renvoie une fonction
 * compteur() // Renvoie 2
 * compteur() // Renvoie 3
 */
const genererCompteur = initValue => {
  let curentValue = initValue;
  return () => ++curentValue;
};

/**
 * Retourne un object Javascript qui contient en clé les lettres de la châine
 * de caractères et leur occurrence en valeur.
 *
 * Notions: Regex Javascript,
 *
 * @example
 * charCounts('laval') // Renvoie { l: 2, a: 2, v: 1 }
 *
 * @param {string} str - Chaîne de caractère
 * @returns {Object<string, number>}
 */
const charCounts = str => {
  const reducer = (accumulator, char) => {
    if (!char.match(/[a-z]/i)) {
      // skip if not a letter
      return accumulator;
    }
    char = char.toLowerCase();

    if (accumulator[char]) {
      accumulator[char] += 1;
    } else {
      accumulator[char] = 1;
    }
    return accumulator;
  };

  return [...str].reduce(reducer, {});
};

/**
 * Retourne un entier qui représente le nombre de jours restants jusqu'au prochain jour de Noël.
 *
 * Notions: Manipulation de Date
 *
 * @param {Date} date - Objet de Date
 * @returns {number} Nombre de jours jusqu'à Noël prochain.
 */
const daysToChristmas = date => {
  const xmas = new Date(2018, 11, 25);
  const inverted = xmas < date;
  const diffTime = Math.abs(inverted ? date - xmas : xmas - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return inverted ? 365 - diffDays : diffDays;
};

/**
 * Renvoie un tableau sans éléments dupliqués.
 *
 * Notions: Manipulation de tableaux (reduce)
 *
 * @example
 * distinct([1, 2, 2, 3, 1]) // Renvoie [1, 2, 3]
 *
 * @param {Array} arr - Tableau avec potentiellement des éléments dupliqués
 * @returns {Array} Tableau sans éléments dupliqués
 */
const distinct = arr => {
  const reducer = (accumulator, value) => {
    if (!accumulator.includes(value)) {
      accumulator.push(value);
    }
    return accumulator;
  };
  return arr.reduce(reducer, []);
};

/**
 * Renvoie un tableau qui contient les clés partagées entre deux objets Javascript.
 *
 * Notions: Manipulation objet (Object.keys()) et tableaux
 *
 * @example
 * commonKeys({ x: 1, y: 2}, { x: 2, z: 4 }) // Renvoie [x]
 *
 * @param {Object} obj1 - Premier objet
 * @param {Object} obj2 - Deuxième objet
 * @returns {Array} Tableau qui contient les cléfs partagées entre deux objets
 */
const commonKeys = (obj1, obj2) => {
  const commons = [];
  const obj2Keys = Object.keys(obj2);
  Object.keys(obj1).forEach(k => {
    if (obj2Keys.includes(k)) {
      commons.push(k);
    }
  });
  return commons;
};

/**
 * Renvoie un tableau trié selon le champ 'author' d'un objet. Si deux objets
 * ont la même valeur dans l'attribut 'author', alors on compare la valeur
 * de l'attribut 'title'.
 *
 * Notion: Trie de tableaux avec .sort(comparator)
 * @param {Array} arr - Tableau à trié
 * @param {Boolean} asc - True si on trie en ordre croissant. False pour décroissant
 * @returns {Array} Tableau trié
 */
const sortByAuthorAndTitle = (arr, asc = true) => {
  const sorted = arr.sort((a, b) => {
    const authorCompare = a.author.localeCompare(b.author);
    return authorCompare == 0 ? a.title.localeCompare(b.title) : authorCompare;
  });

  return asc ? sorted : sorted.reverse();
};

/**
 * Convertit une fonction de trois paramètre non-currifiée vers une fonction
 * currifiée de 3 paramètres. P. ex., sum(x, y, z) est une fonction
 * non-currifié de 3 paramètres. La version currifiée de cette fonction est
 * sum(x)(y)(z). Cette version nous permet d'appeler partiellement la
 * fonction, p. ex., sum(1), sum(1)(2) ou encore sum(1)(2)(3).
 *
 * Notions: Fonctions lambda
 *
 * @example
 * const sum = (x, y, z) => x + y + z
 * sum(10, 5, 3) // Renvoie 18
 * const sumCurried = curry(sum)
 * sumCurried(10)(5)(3) // Renvoie 18
 *
 * @param {Function} fun - Fonction à currifier
 * @param {any} x - 1re paramètre
 * @param {any} y - 2e paramètre
 * @param {any} z - 3e paramètre
 * @returns {Function} Fonction currifiée
 */
const curry3 = fun => {
  return x => {
    return y => {
      return z => {
        return fun(x, y, z);
      };
    };
  };
};

/**
 * Applique une fonction de rappel sur chaque élément d'un tableau et retourne
 * le tableau transformé.
 * Cette fonction existe déjà, mais réimplémentez la.
 *
 * Notions: Manipulation de tableaux, récursivité
 *
 * @example
 * map([1,2,3], x => x * 2) // renvoie [2,4,6]
 * @example
 * map([1,2,3], x => x + '' + x) // renvoie ['11', '22', '33']
 *
 * @param {Array} arr
 * @param callback - Fonction de rappel
 * @returns {Array}
 */
function map(arr, callback) {
  if (arr.length > 0) {
    const elem = arr.shift();
    return [callback(elem), ...map(arr, callback)];
  }
  return [];
}

/**
 * Applique un prédicat sur chaque élément d'un tableau et renvoie le premier
 * éléments qui satisfait le prédicat. Sinon, renvoie null.
 * Cette fonction existe déjà, mais réimplémentez la.
 *
 * Notions: Manipulation de tableaux, récursivité
 *
 * @example
 * find([1,4,3], x => x > 2) // renvoie 4
 * @example
 * find([1,4,3], x => x > 5) // renvoie null
 *
 * @param {Array} arr
 * @param callback - Fonction de rappel
 * @returns {Array}
 */
function find(arr, predicate) {
  if (arr.length > 0) {
    const value = arr.shift();
    return predicate(value) ? value : find(arr, predicate);
  }
  return null;
}

/**
 * Cette fonction de rappel prend un accumulateur et une valeur de tableau en entrée et renvoie
 * un nouveau accumulateur.
 *
 * @callback foldCallback
 * @template S
 * @param {S} acc - Accumulateur
 * @template T
 * @param {T} x - Valeur d'un tableau
 * @returns {S} Accumulateur
 */

/**
 * Applique une fonction de rappel à partir d'un accumulateur, initialisé au
 * départ, et chaque élément d'un tableau et retourne l'accumulateur final.
 *
 * Notions: Manipulation de tableaux, récursivité
 *
 * @example
 * fold([1,2,3,4,5], 0, (acc, x) => acc + x) // renvoie 15
 * @example
 * fold([1,2,3], [], (acc, x) => [...acc, x ** 2]) // renvoie [1,4,9]
 *
 * @template T
 * @param {Array<T>} arr
 * @template S
 * @param {S} init - Valeur initiale de l'accumulateur
 * @param {foldCallback} op - Fonction de rappel qui prend un accumulateur et un
 * élément du tableau en paramètre.
 * @returns {S} Accumulateur
 */
function fold(arr, init, op) {
  if (arr.length > 0) {
    const value = arr.shift();
    const accumulateur = op(init, value);
    return fold(arr, accumulateur, op);
  }
  return init;
}

/**
 * Classe Employee représentée par trois attributs: id, name, salary. Nous
 * pouvons accéder aux trois attributs, mais seulement 'name' peut être
 * modifié.
 *
 * Il existe une méthode toString() qui permet d'afficher une représentation
 * en chaîne de caractères de l'objet.
 *
 * @example
 * const e = new Employee(1, 'Konstantinos', 50000)
 * e.toString() // Renvoie 'Employee name=Konstantinos,salary=50000
 */
class Employee {
  constructor(id, name, salary) {
    this._id = id;
    this.name = name;
    this._salary = salary;
  }

  get salary() {
    return this._salary;
  }

  get id() {
    return this._id;
  }

  toString() {
    return `Employee name=${this.name},salary=${this.salary}`;
  }
}

/**
 * Classe Chercheur représentée par 4 attributs: id, name, salary, bonus.
 * Elle hérite de Employee. L'attribut 'bonus' ne peut être accéder ni
 * modifié.
 *
 * Surcharger la méthode toString() pour ajouter l'attribut bonus.
 *
 * @example
 * const e = new Chercheur(1, 'Konstantinos', 50000, 10)
 * e.toString() // Renvoie 'Employee name=Konstantinos,salary=50000,bonus=10
 */
class Chercheur extends Employee {
  constructor(id, name, salary, bonus) {
    super(id, name, salary);
    this._bonus = bonus;
  }

  get salary() {
    return super.salary + super.salary * (this._bonus / 100);
  }

  toString() {
    return `Employee name=${this.name},salary=${this.salary},bonus=${this._bonus}`;
  }
}

export {
  genererCompteur,
  charCounts,
  daysToChristmas,
  distinct,
  commonKeys,
  sortByAuthorAndTitle,
  curry3,
  map,
  find,
  fold,
  Employee,
  Chercheur
};
