# <div align="center"> JustStreamIt </div>

Ce dépôt contient :
- **JustStreamIt/** : le code source du front-end (HTML, CSS, JavaScript).
- **OCMovies-API-EN-FR/** : l’API Django fournie pour lister et filtrer les films.

Le but est de pouvoir lancer à la fois :
1. Le serveur local pour la partie front-end (port 3000).
2. Le serveur Django pour l’API (port 8000).

---

## <div align="center">Prérequis</div>

- **Python 3.7+** (avec pip)
- **Git** (facultatif si vous avez déjà récupéré le dossier)
- Le repo de l'API test OCMovies disponible ici ---> https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
> Ce repo et celui de l'API doivent se trouver dans le même dossier racine afin que la commande décrite plus loin soit fonctionnelle.
- Un terminal (Bash, Zsh, CMD ou Powershell) permettant d’exécuter les commandes
- (Optionnel) **Virtualenv** ou une autre solution de virtualisation Python

---
  
## <div align="center">Installation</div>

### 1. **Cloner** ce dépôt (ou le télécharger) puis le placer à la racine du projet :
  
```bash
git https://github.com/dim-gggl/JustStreamIt.git
```

puis

```bash
cd JustStreamIt
```
  
### 2.	**Créer** et **activer** un environnement virtuel (recommandé) :
  
#### •	Sur macOS / Linux :
  
```bash
python -m venv venv
source venv/bin/function activate
```
  
#### •	Sur Windows :
  
```bash
python -m venv venv
venv\Scripts\activate
```
  
### 3.	**Installer les dépendances** requises pour l’API :
  
```bash
pip install -r OCMovies-API-EN-FR/requirements.txt
```
  
### 4. **Lancement** du site
  
#### - Un **script** Python, `run_servers.py`, se trouve à la racine du projet et lance simultanément :

> • Le serveur local pour le front-end (équivalent à `python -m http.server 3000`).  
  
> • Le serveur Django pour l’API (équivalent à `python OCMovies-API-EN-FR/manage.py runserver`).  
  
#### <div align="center">- **Exécution** du script</div>

Toujours depuis la racine du projet (⚠️ **et avec l’environnement virtuel actif**), exécutez :

```bash
python run_servers.py
```
  
Les messages suivants devraient apparaître dans le terminal :  
  
> • _« Démarrage du serveur front sur le port 3000 … »_ 
  
> • _« Démarrage du serveur Django de l’API sur le port 8000 … »_  
  
> • _« Les deux serveurs sont lancés. Appuyez sur Ctrl + C pour les arrêter. »_ 
     
#### <div align="center"> - **Accéder au site**</div>
  
> • Front-end : http://localhost:3000/JustStreamIt/src/index.html 
  
> • API : http://127.0.0.1:8000/api/v1/titles ou http://127.0.0.1:8000/api/v1/genres/  
  

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
  
> • OCMovies-API-EN-FR/ contient l’API Django.  
  
> • `run_servers.py` lance les deux serveurs en parallèle.  
  
---

#### <div align="center">**Personnalisation**</div>
  
Si vous souhaitez lancer l’API sur un autre port (ex : 5000), éditez la commande dans run_servers.py :
  
```python
api_server_cmd = ["python", "OCMovies-API-EN-FR/manage.py", "runserver", "5000"]
```

De même pour le front-end (remplacer « 3000 » par le port de votre choix).

#### <div align="center">**Compatibilité**</div>

> • Testé avec Python 3.8+ sur macOS / Linux / Windows.  
  
> • Utilise uniquement des librairies standard hormis les dépendances Django listées dans OCMovies-API-EN-FR/requirements.txt.  
  
