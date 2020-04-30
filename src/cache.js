class Cache{
    static expris = 100;  
    static setData (key, value) {
        let data = {
            data : value,
            time : Date.parse(new Date())
        }
        window.localStorage.setItem(key, JSON.stringify(data));
    }   
  
    static getData (key) {
        let data = window.localStorage.getItem(key);
        let value = JSON.parse(data);
        let now = Date.parse(new Date());
        if (value && value.time && now - value.time < this.   expris* 1000) {
            return value.data;
        } else {
            window.localStorage.removeItem(key);
            return false;
        }
    }
  
  };
  
  export default Cache; 