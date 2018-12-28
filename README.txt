You can build the app for android using the following command:
ionic cordova build android

jdk 1.8 is required. 

You can setup jdk in debian systems (ubuntu) for current session using the command:
JAVA_HOME=<PATH> export
example JAVA_HOME=/usr/lib/jvm/java-8-oracle export

if more JDKs are available, use this command for selecting the appropriate jdk:
sudo update-alternatives --config javac

To check the currently used JDK:
echo $JAVA_HOME


App name is defined in the following file:
config.xml
    <widget id="com.santoro.ciro.recipebook" ....
    <name>MyAppRecipeBook</name>