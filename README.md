# <div align="center">🇫🇷 Stream IT </div>

Ce dépôt contient :
- **JustStreamIt/src/** : le code source du front-end (HTML, CSS, JavaScript).
- **OCMovies-API-EN-FR/** : l’API Django fournie pour lister et filtrer les films.

Le but est de pouvoir lancer à la fois :
1. Le serveur local pour la partie front-end (port 3000).
2. Le serveur Django pour l’API (port 8000).

---

## <div align="center">Prérequis</div>

- **Python 3.7+** (avec pip)
- Le dépôt de l'API test OCMovies disponible ici :   
> https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git  
> Ce repo et celui de l'API doivent se trouver dans le même dossier racine afin que les commandes décrites ici soient fonctionnelles.  
- Un terminal (Bash, Zsh, CMD ou Powershell) permettant d’exécuter les commandes
- (Optionnel) **Virtualenv** ou une autre solution de virtualisation Python

---
  
## <div align="center">Installation</div>

### 1. **Cloner** ce dépôt (ou le télécharger) puis le placer à la racine du projet :
  
```bash
git clone https://github.com/dim-gggl/JustStreamIt.git
```

puis

```bash
cd JustStreamIt
```
---
  
### 2.	**Créer** et **activer** un environnement virtuel (recommandé) :
  
#### •	Sur macOS / Linux :
  
```bash
python3 -m venv venv
source venv/bin/activate
```
  
#### •	Sur Windows :
  
```bash
python3 -m venv venv
venv\Scripts\activate
```
---
  
### 3.	**Installer les dépendances** requises pour l’API :
  
```bash
pip install -r OCMovies-API-EN-FR/requirements.txt
```

ou

```bash
pip3 install -r OCMovies-API-EN-FR/requirements.txt
```
---
  
### 4. **Lancement** des serveurs
  
#### - Un **script** Python, `run_servers.py`, se trouve à la racine du projet et lance simultanément :

> • Le serveur local pour le front-end (équivalent à `python3 -m http.server 3000`).  
  
> • Le serveur Django pour l’API (équivalent à `python3 OCMovies-API-EN-FR/manage.py runserver`).  
  
#### <div align="center">- **Exécution** du script</div>

Toujours depuis la racine du projet (⚠️ **et avec l’environnement virtuel actif**), exécutez :

```bash
python3 run_servers.py
```
  
Les messages suivants devraient apparaître dans le terminal :  
  
> • _« Démarrage du serveur front sur le port 3000 … »_ 
  
> • _« Démarrage du serveur Django de l’API sur le port 8000 … »_  
  
> • _« Les deux serveurs sont lancés. Appuyez sur Ctrl + C pour les arrêter. »_ 
     
#### <div align="center"> - **Accéder au site**</div>
  
> • L'API : http://127.0.0.1:8000/api/v1/titles ou http://127.0.0.1:8000/api/v1/genres/ 
> • Front-end : http://127.0.0.1:3000/JustStreamIt/src/index.html  
  

Pour arrêter les serveurs, vous pouvez taper Ctrl + C dans le terminal où le script est lancé.

#### <div align="center">- **Arborescence du projet**</div>
  
```
JustStreamIt
├── run_servers.py
├── JustStreamIt
│   └── src
│       ├── index.html
│       ├── style.css
│       └── scripts
│           ├── config.js
│           ├── script.js
│           └── ...
└── OCMovies-API-EN-FR
    ├── manage.py
    ├── requirements.txt
    └── ...
```
  

> • JustStreamIt/src/ contient le code HTML/CSS/JS (front-end).  
  
> • OCMovies-API-EN-FR/ contient l’API et sa base de données nécessaire au bon fonctionnement de l'application Stream IT..  
  
> • `run_servers.py` lance les deux serveurs en parallèle.  
  
---

#### <div align="center">**Personnalisation**</div>
  
Si vous souhaitez lancer l’API sur un autre port (ex : 5000), vous pouvez éditer la commande dans run_servers.py :
  
```python
api_server_cmd = ["python", "OCMovies-API-EN-FR/manage.py", "runserver", "5000"]
```

De même pour le front-end (remplacer « 3000 » par le port de votre choix).

#### <div align="center">**Compatibilité**</div>

> • Testé avec Python 3.9, 3.10, 3.11 et 3.12 sur macOS / Linux / Windows.  
  
> • Utilise uniquement des librairies standard hormis les dépendances Django listées dans OCMovies-API-EN-FR/requirements.txt.  

---

---

# <div align="center"> 🇬🇧 Stream IT</div> 

This repo contains :
- **JustStreamIt/src/**: the front-end source code (HTML, CSS, JavaScript).
- **OCMovies-API-EN-EN/**: the test API provided to list and classify films.

The aim is to be able to launch simultaneously:
1. The server for the application (port 3000).
2. The Django server for access to the API database (port 8000).

---

## <div align="center">Requirements</div>

- **Python 3.7+** (with pip)
- The OCMovies API repository available here :   
> https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git  
> This repo and the API's must be in the same root folder for the commands described here to work.  
  
A terminal (Bash, Zsh, CMD or Powershell) for executing the commands.
(Optional) **Virtualenv** or any other Python virtualisation solution.

---  

## <div align="center">Installation</div>

**Clone** this repository (or download it) and place it at the **root** of the directory of your choice and :
  
```bash
git clone https://github.com/dim-gggl/JustStreamIt.git
```

then

```bash
cd JustStreamIt
```

---
  
### 2.	**Create** and **activate** a virtual environment (recommended) :

  
  
#### - On macOS / Linux:
  
```bash
python3 -m venv venv
source venv/bin/activate
```
  
#### - On Windows:
  
```bash
python3 -m venv venv
venv\Scripts\activate
```
---
  
### 3.	**Install the dependencies** required for the API :
  
```bash
pip install -r OCMovies-API-EN-EN/requirements.txt
```

or

```bash
pip3 install -r OCMovies-API-EN-EN/requirements.txt
```
---
  
### 4. **Launch** the servers
  
#### - A Python **script**, `run_servers.py`, is located at the root of the project and simultaneously launches :

> • Le serveur local pour le front-end (équivalent à `python3 -m http.server 3000`).  
  
> • Le serveur Django pour l’API (équivalent à `python3 OCMovies-API-EN-FR/manage.py runserver`).  
  
### <div align="center">**Running** the script</div>

Still from the root of the project (⚠️ **and with the virtual environment active**), run :

```bash
python3 run_servers.py
```
  
The following messages should appear in the terminal:  
  
> - _‘Start front server on port 3000 ... ’_ 
  
> - _‘Starting the Django API server on port 8000 ... ’_  
  
> - _‘ Both servers are started. Appuyez sur Ctrl + C pour les arrêter. »_ 
     
#### <div align=‘center’>**Accessing the site**</div>
  
> - The API: http://127.0.0.1:8000/api/v1/titles or http://127.0.0.1:8000/api/v1/genres/ 
> - Front-end: http://127.0.0.1:3000/JustStreamIt/src/index.html  
  

In order to stop the servers, you can type Ctrl + C in the terminal where the script is launched.

#### <div align=‘center’>- ** Project tree**</div>
  
```
JustStreamIt
├── run_servers.py
├── JustStreamIt
│ └── src
│ ├── index.html
│ ├── style.css
│ └── scripts
│ ├── config.js
│ ├── script.js
│ └── ...
└── OCMovies-API-EN-FR
    ├── manage.py
    ├── requirements.txt
    └── ...
```
  

> JustStreamIt/src/ contains the HTML/CSS/JS code (front-end).  
  
> - OCMovies-API-EN-EN/ contains the API and its database required for the Stream IT application to function correctly...  
  
> • `run_servers.py` launches the two servers in parallel.  
  
---

#### <div align=‘center’>** Personnalisation**</div>
  
If you ever want to launch the API on another port (e.g. 5000), you can edit the command in run_servers.py:
  
```python
api_server_cmd = [‘python’, ‘OCMovies-API-EN-FR/manage.py’, ‘runserver’, ‘5000’]
```

The same goes for the front-end (replace ‘3000’ with the port of your choice).

#### <div align=‘center’>** Compatibility**</div>

> - Tested with Python 3.9, 3.10, 3.11 and 3.12 on macOS / Linux / Windows.  
  
> - Uses only standard libraries apart from the Django dependencies listed in OCMovies-API-EN-EN/requirements.txt.  
