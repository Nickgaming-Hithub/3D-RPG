import * as THREE from 'three';

class grassBlockTop {
    map() {
        this.texture = new THREE.TextureLoader().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAwRJREFUOE89U0loU1EUPS9zfn7GlvzW2qodjJ3S0latWBUE3VhE3CgoCIKuC6KIuHKtS7dCoS5FEItoBSnixqF0iFXbhqZp0yFNk/6kMXOe3Kv44PH57w7v3HPOE3dfX5AGgwGVSgWZTAa07Iod+q4OVVXh8/mQz+ext7fHOZRL/6lUCo2NjRD3xodlLpfDfqcfuXweRggsp2Kw2e2cWK1W0dfazcWxTBzJZBKKoqBcLsNkMkE8nrgm6+rquPjzr2mYzWZGYbPZIKXkJFVxwGt0cGxm5Sd0Xef4md4TEFeedkmXxwOz2QSX04ViscjBWGwNlUqVG9C2KwpUReGLSqUSnxEa8WjyqoxGo+hr7cS3xRAGWrogjQYsLCzgcHMrVI+KV5PvoDoc6D/UDoPBhM+LszwGIRIP3l6SBDUSiWAw0Ivp6E9ofo1nd0sb1tJxON0uJrhYKiGbzcLr8cBisfAWN54dlQHtIJO2mt5ilmlGq9XKyXSL0WjEsSO9yP/OYSmxigPuOmzkkhB6EWLk5XlJbNNhLJvggkQigUAgwKhqa2vR5K3HbOQ7ioUyXC4X9ik1mF8Po7+lC+Lm6KBsqdmPhoYG1loYDJhamsPRth4kU0lomgaSeWp5nqHTKJrVg2h6i9US999clNvb2zgdPI5v4RCqsgzN5IW3xoeppRDMVgscDgeEENwsFosh2BTA3OoC0uk0xMOJy1Itm7GLHDSbD6HoPIZ6TmAmPA+ntKI7GMSLD+Po7Q4iHA6zOwuFApNst9shbo2dlH3NnZiO/EDAfwDxUho7Ozs8K0GnL+lO/iD7kv60qIHT6YQYm7sjQ2uLiMfj3NHtdv/3PqlAhHZ0dHADmr+zoZXl+7I4y2jE6PSIJNk+ff/K1iX52ONCYHjoHMNua2sDmS1e1Fmlzc1NtNc3//XBk/fXJcFZTq1D11M423cK+UIeK6kNVKUEEUzk0SLSCAGpRZI3uTSI28+HpNfr5SB1HhgY4AR6bd2NAZb0eFc/xj9OwPLPVASdvOP3+/EHuf+IKqWSjNAAAAAASUVORK5CYII=");
        this.texture.magFilter = THREE.NearestFilter;
        return this.texture;
    };
};

export default grassBlockTop;