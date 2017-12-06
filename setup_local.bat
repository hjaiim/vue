@echo Prepare to start install, PLS keep network good.
@cnpm install
cd src
git clone http://101.37.81.41:8888/framework-web/jslib.git
cd jslib
git checkout -b beta1 origin/beta1
@echo All modules has been installed.
pause;