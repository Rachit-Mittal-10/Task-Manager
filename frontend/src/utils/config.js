class ConfigService{
    constructor(){
        this._CONFIG = null;
    }
    load = async () => {
        const res = await fetch("/config/config.json",{cache: 'no-store'});
        if(!res.ok){
            throw new Error(`config.json file not found at /config/config.json url. Error Status: ${res.status}`);
        }
        this._CONFIG = await res.json();
        if(!this._CONFIG.baseUrl){
            throw new Error(`base url not found in config.json file. App could not be loaded hence.`)
        }
    };
    get = (key) => {
        if(!this._CONFIG){
            throw new Error(`Config.json not loaded`);
        }
        if(!(key in this._CONFIG)){
            throw new Error(`key: ${key} does not exist`);
        }
        return this._CONFIG[key];
    }
    // reload = async () => {
    //     this._CONFIG = null;
    //     await this.load();
    // }
};
const config = new ConfigService();

// exporting the class just in case
export { ConfigService };

// singleton instance
export default config;