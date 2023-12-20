
# Getting Started - Face Recognition Server
This guide provides step-by-step instructions for setting up and running the face recognition server as part of the signage solution project. Follow these steps to ensure the server is configured and operational.


- Navigate to the Flask Directory:
   ```sh
   cd signage_solution/flask
   ```
   
## Setting Up Python3.9 on Your Local PC & Virtual Environment

**Note**: It is important to use Python 3.9 for this setup. Using different versions, such as Python 3.11, has been known to cause errors, particularly during the Flask execution phase. To ensure compatibility and avoid potential issues, please stick to Python 3.9.


1. Check if Python 3.9 is installed by running:
   ```sh
   python3.9 -V
   ```

   If Python 3.9 is not installed, you can install it using Homebrew on MacOS or download it from the Python website for Windows users:<br/><br/>
   For MacOS:
   ```sh
   brew install python@3.9
   ```
   For Windows:
   - Download the Python 3.9 installer from the [official Python website](https://www.python.org/downloads/).
   - Run the installer and follow the prompts to install Python 3.9.
  
2. After installing Python 3.9, go back to `/signage_solution/flask` directory and set up a virtual environment named `env` using:
   ```sh
   python3.9 -m venv env
   ```

3. Activate the virtual environment with the following command:
   For MacOS/Linux
   ```sh
   source env/bin/activate
   ```
   For Windows
   ```sh
   env\Scripts\activate
   ```
4. Install Dependencies in the virtual environment

   ```sh
   pip install -r requirements.txt
   ```
   
5. Create a `.env` file in the `/flask` directory. This file will store environment-specific variables, which are essential for configuring the server settings.

   Here is an example of what the contents of the `.env` file might look like:
  
   ```plaintext
   user=<database username> e.g. root
   password=<database password> e.g. pass
   host=<database host> e.g. localhost
   database_name=<database name> e.g. kioskDB
   korean_font_path=<path to Korean font file> e.g. /System/Library/Fonts/AppleSDGothicNeo.ttc
   ```
6. Setting Complete! if you want to deactivate the `env` virtual environment, run:
   ```sh
   deactivate
   ```
## Getting Started
1. If `env` virtual environment is not activated run:<br/><br/>
   For MacOS/Linux
   ```sh
   source env/bin/activate
   ```
   For Windows
   ```sh
   env\Scripts\activate
   ```
2. Run:
   ```sh
   python app.py
   ```

3. Complete! if you want to quit server and deactivate the `env` virtual environment, `Ctrl+c` and run:
   ```sh
   deactivate
   ```
