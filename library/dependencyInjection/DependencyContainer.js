import DependencyRegistration from "./DependencyRegisteration.js";
class DependencyContainer {
  constructor() {
    this.usedDependency = new Map();
    this.registerDependency = [];
  }

  register(key, factory) {
    this.registerDependency.push(new DependencyRegistration(key, factory));
  }

  resolve(key) {
    //  using saved instance
    const exisitingDependencyInstance = this.usedDependency.get(key);
    if (exisitingDependencyInstance) {
      return exisitingDependencyInstance;
    }
    const availableDependency = this.registerDependency.find(
      (dep) => dep.key === key
    );
    if (!availableDependency) {
      throw new Error(`Dependency ${key} is missing`);
    } else {
      //creating instance and saving in map
      const dependencyInstance = availableDependency.factory();
      this.usedDependency.set(key, dependencyInstance);
      return dependencyInstance;
    }
  }
}

const instance = new DependencyContainer();

export default instance;
