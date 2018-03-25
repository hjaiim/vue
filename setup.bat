@echo Prepare to start install, PLS keep network good.
pause

call npm remove -g babel babel-cli babel-eslint babel-loader clean-css compression-webpack-plugin eslint
 eslint-config-airbnb eslint-friendly-formatter extract-text-webpack-plugin fnv-plus html-webpack-plugin node-sass opn ora sass sass-loader shelljs vue-cli webpack webpack-merge

call cnpm install -g babel@6.5.2 babel-cli@6.18.0 babel-eslint@7.0.0 babel-loader@6.2.8 clean-css@3.4.24 compression-webpack-plugin@0.3.2 eslint@3.8.1 eslint-config-airbnb@12.0.0 eslint-friendly-formatter@2.0.7 extract-text-webpack-plugin@1.0.1 fnv-plus@1.2.12 html-webpack-plugin@2.24.1 node-sass@3.13.0 opn@4.0.2 ora@0.3.0 sass@0.5.0 sass-loader@4.0.2 shelljs@0.7.6 vue-cli@2.8.1 webpack@1.14.0 webpack-merge@1.0.2

@echo All modules has been installed.

cd src
git clone https://git.coding.net/billypc025/jslib.git
cd jslib
git checkout -g beta1 origin/beta1