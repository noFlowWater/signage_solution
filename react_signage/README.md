# Getting Started - React App


### Setting Up Node.js on Your Local PC

If you haven't installed Node.js on your local PC, please complete the installation of Node.js.
Once installed, verify the installation by running `node -v` in your command line or terminal. This will display the installed version of Node.js.

Move to react project's root directory
```sh
cd signage_solution/react_signage
```

### Configuring Server Addresses in `src/constants.js`

To ensure proper communication between the client and servers, modify the server addresses in the `src/constants.js` file:

1. Locate and open the `src/constants.js` file in your project's directory.
   

2. Update the kiosk and flask server addresses and port numbers to match those of the servers you want to communicate with. Ensure that both the server and client are on the same Wi-Fi network.
   ```javascript
   // src/constants.js
   export const kiosk = 'http://{IP address of kiosk server}:4000';
   export const flask = 'http://{IP address of flask server}:5001';
   // Replace the IP addresses and ports as needed.
   ```
   When running the project locally, you can use localhost in place of the IP address.
   ```javascript
   // For local setup in src/constants.js
   export const kiosk = 'http://localhost:4000';
   export const flask = 'http://localhost:5001';
   ```

## **Basic Setup Local Client With React (for Admin Feature or Debugging)**


1. Install Dependencies
   ```sh
   npm install
   ```
2. Start the Project
   ```sh
   npm run start
   ```



## **Basic Setup webOS Client With React**

Before starting the setup process, ensure the following requirements are met:

- **Raspberry Pi Setup**: You should have a Raspberry Pi that successfully boots with the webOS OSE image.
- **Network Connection**: The Raspberry Pi and your local PC must be connected to the same network. This connection is essential for the setup process using the webOS OSE CLI from your local PC.
- **Node.js on Local PC**: Node.js must be installed on your local PC as it is required to run the webOS OSE CLI. 



### Installing the webOS OSE CLI

1. Install the webOS OSE CLI by executing the following command:
   ```sh
   sudo npm install -g @webosose/ares-cli
   ```

2. After installing the webOS OSE CLI, you can verify its installation by running:
   ```sh
   ares
   ```
3. To set up a new device for development, use the ares-setup-device command. This will guide you through the process of registering and configuring a new device for your development environment:
   ```sh
   ares-setup-device
   ```
   <img style="width: 70%;" alt="ares-setup-device-1" src="https://github.com/noFlowWater/signage_solution/assets/112642604/705017e4-0f6c-44df-9eca-9a349032aeb9">
   <img style="width: 70%;" alt="ares-setup-device-2" src="https://github.com/noFlowWater/signage_solution/assets/112642604/8bb00506-8c38-4717-977a-37b02b1d88fa">
   <img style="width: 70%;" alt="ares-setup-device-3" src="https://github.com/noFlowWater/signage_solution/assets/112642604/181cfcf9-93a7-42b8-8494-d5705648aacf">
   
   
4. To verify the devices that are already set up, use the following command:
   ```sh
   ares-install -D
   ```

<br/>This will list all the devices that have been set up and are ready for development.<br/>


### Deployment Script: deploy.sh

Before running the `deploy.sh` script, ensure you are in the react project's root directory, which is the parent directory where the `build` will be created. The `deploy.sh` script automates the building and deploying process of the project.

#### Requirements
- The `deploy.sh` script should be located in the react project's root directory.
- An `icon.png` file should also be placed in the react project's root directory.
- Raspberry Pi with webOS set must be powered on
- The local PC (from which you are deploying) and the Raspberry Pi must be connected to the same network for successful deployment.

#### deploy.sh Script

The `deploy.sh` script performs the following actions:
- Removes existing build and IPK directories.
- Creates a new build of the react project.
- Generates the `appinfo.json` file and copies the `icon.png` file into the build directory.
- Packages the application into an IPK file.
- Installs and launches the app on the specified device.

```bash
#!/bin/bash
# bash 자동화 스크립트 실행 전, 디렉토리는 build를 생성할 상위 디렉토리이어야 한다.
# deploy.sh는 프로젝트 디렉토리에서 실행해야 한다.

# Remove build file.
rm -rf build

# Remove IPK file.
rm -rf IPK

# Build the project
npm run build

# Change to the build directory
cd build

# Create appinfo.json and add content
printf '{\n "id": "kr.ac.knu.app.signage",\n "version": "1.0.0",\n "vendor": "My Company",\n "type": "web",\n "main": "index.html",\n "title": "new app",\n "icon": "icon.png",\n "allowVideoCapture": true,\n "requiredPermissions": [ "time.query", "activity.operation" ]\n}' > appinfo.json

# Copy the icon.png file
cp ../icon.png icon.png

# Package the application
ares-package . -o ../IPK

# Change to the IPK directory
cd ../IPK

# Remove existing installation
ares-install -d jongmal -r kr.ac.knu.app.signage

# Install the new package
ares-install -d jongmal kr.ac.knu.app.signage_1.0.0_all.ipk

# Launch the app
ares-launch -d jongmal kr.ac.knu.app.signage

# Open inspector
ares-inspect -d jongmal —app kr.ac.knu.app.signage

# Change directory
cd ..
```

5. Change its execution permission with the following command:
   ```sh
   chmod +x deploy.sh
   ```
6. To deploy your project, Execute the `deploy.sh` script from the react-signage directory:
   ```sh
   ./deploy.sh
   ```

<br/>
This script simplifies the deployment process, ensuring that your application is built, packaged, and deployed efficiently to your target device.

