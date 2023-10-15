// using stratergy pattern 
export default class BusFilterStrategy {
    filter(buses, searchQuery) {
      throw new Error('This method should be overridden by concrete strategies');
    }
  }
  
  export class BusNoFilterStrategy extends BusFilterStrategy {
    filter(buses, searchQuery) {
      return buses.filter((bus) => bus.busNo.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  }
  
  export class DriverFilterStrategy extends BusFilterStrategy {
    filter(buses, searchQuery) {
      return buses.filter((bus) => bus.driver.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  }
  
  export class ConductorFilterStrategy extends BusFilterStrategy {
    filter(buses, searchQuery) {
      return buses.filter((bus) => bus.conductor.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  }
  