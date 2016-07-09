# ProzoTest
Test Application for Prozo


## SetUp Guide 

1. Install ionic and cordova using `npm install -g ionic cordova`
2. Checkout the git repo
3. Run `npm install`
4. Run `bower install`
5. Rum `ionic state restore` to install all platforms and plugins 
6. Run `ionic build <platform` to build for particular platform 


## Proxy 

1. To avoid CORS erros in browser replace `BASE_URL` in `www/app/api/restApi.js` with `http://localhost:8100/api`
