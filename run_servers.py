import subprocess
import sys
import os

def main():
    # Launch the HTTP server for the front end
    # You can replace 'python3' with 'python' or 'py' depending on your configuration
    front_server_cmd = ["python3", "-m", "http.server", "3000"]
    
    # Launch the Django server for the API
    # On Windows, we often use 'py' or 'python' to invoke manage.py
    api_server_cmd = ["python", "OCMovies-API-EN-FR/manage.py", "runserver"]

    try:
        print("Démarrage du serveur front sur le port 3000 ...")
        front_process = subprocess.Popen(
            front_server_cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        print("Démarrage du serveur Django de l’API sur le port 8000 ...")
        api_process = subprocess.Popen(
            api_server_cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        print("Les deux serveurs sont lancés.")
        print("Appuyez sur Ctrl + C pour les arrêter.")
        
        # We wait for the processes to finish,
        # or for the user to abort execution (Ctrl + C)
        front_process.wait()
        api_process.wait()

    except KeyboardInterrupt:
        print("\nArrêt en cours...")
        front_process.terminate()
        api_process.terminate()

if __name__ == "__main__":
    main()