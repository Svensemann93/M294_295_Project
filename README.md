# M294_295_Project
Onlishopverwaltung für das Projekt der Module 294 und 295
---
# Installationsanleitung für das Onlineshopverwaltungs-Projekt
 
Diese Anleitung beschreibt, wie du das Onlineshopverwaltungs-Projekt aus dem Git-Repository klonst und auf deiner lokalen Entwicklungsumgebung startest.
 
---
 
## Voraussetzungen
 
- **Java 21**
- **Maven 3.9.10**
- **Node.js**
- **npm** (wird mit Node.js installiert)
- **Git** (Github Account)
- **IDE** (am besten VSCode oder Codium)
- **MySQL Workbench**
 
Um Java, Maven, Node.js und Git zu installieren, empfiehlt es sich, den Chocolatey Package Manager zu nutzen.
 
Weitere Details findest du unter: https://chocolatey.org/
 
Nach der Installation über Chocolatey, kannst du mit folgenden Befehlen im Windows Terminal (cmd) prüfen, ob die Software und die korrekten Versionen davon installiert sind:
 
```bash
java --version
```
```bash
mvn -v
```
```bash
node -v
```
```bash
npm -v
```
```bash
git --version
```
 
---
 
## 1. Repository klonen
 
Öffne ein Terminal und führe folgenden Befehl aus:
 
```bash
git clone <REPO-URL>
cd OnlineshopProject
```
- **Alternativ kannst du das Repo auch direkt über die IDE klonen. Das ist gerade bei der Verwendung von VSCode oder Codium deutlich einfacher.**
 
---
 
## 2. MySQL Datenbank aufsetzen
 
Damit das Backend mit einer MySQL Datenbank überhaupt läuft, ist die Erstellung der Datenbank pflicht. Dazu findest du im Ordner "/SQL_Scripts" das File CreateDatabase.sql. Dieses File lässt du in deiner MySQL Workbench laufen.
 
- MySQL Workbench öffnen
- Eine MySQL Connection erstellen
- In der Regel heisst die neue Connection "Local instance MySQL80"
- In dieser Instanz kann das Script "CreateDatabase.sql" ausgeführt werden.
 
Wenn der Code erfolgreich war, hast du jetzt die notwendige Datenbank in deiner Workbench.
 
- **WICHTIG: Merke dir die Zugangsdaten zu deiner Connection, diese wirst du zu einem späteren Zeitpunkt benötigen!**
 
---
 
## 3. Backend konfigurieren und starten
 
1. Gehe in den Ordner:
"\294_295_Project\backend\m294_295_project\src\main\resources" und bearbeite die application.properties Datei.
 
- In dieser Datei fügst du deine Zugangsdaten der soeben erstellten MySQL Connection ein. Achte darauf, dass die Localhost Adresse mit der angezeigten Adresse in der MySQL Workbench überein stimmt und dass das Passwort ebenfalls stimmt.
 
2. Wechsle anschliessend in das "backend" Verzeichnis: (z.B. im cmd Terminal von VSCode)
 
   ```bash
   cd backend/m294_295_project
   ```
 
2. Abhängigkeiten installieren und Backend starten:
 
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
 
Das Backend läuft standardmässig auf [http://localhost:8080](http://localhost:8080). Wenn das Backend ohne Fehler startet, kannst du bereits Daten mit Insomnia oder Postman von der Datenbank holen. Dieser Schritt ist aber optional und dient nur dem Testing.
 
---
 
## 4. Frontend starten
 
1. Wechsle ins Frontend-Verzeichnis:
 
   ```bash
   cd frontend-vite
   ```
 
2. Abhängigkeiten installieren:
 
   ```bash
   npm install
   ```
 
3. Frontend starten:
   ```bash
   npm run dev
   ```
 
Das Frontend läuft standardmässig auf [http://localhost:5173](http://localhost:5173).
 
---
 
## 5. Anwendung im Browser öffnen
 
- Öffne [http://localhost:5173](http://localhost:5173) in deinem Browser.
- Das Frontend kommuniziert automatisch mit dem Backend unter [http://localhost:8080](http://localhost:8080).
 
---
 
## 6. Hinweise
 
- Falls das Backend nicht sauber und ohne Fehler startet, prüfe die Zugangsdaten die du beim Schritt 3 eingetragen hast.
---
 
## 7. Tests ausführen
 
### Backend-Tests
 
Wenn du die erstellten Tests für das Backend ausführen möchtest, gehst du wie folgt vor:
 
```bash
cd backend/m294_295_project
mvn test
```
 
### Frontend-Tests
 
Wenn du die erstellten Tests für das Frontend ausführen möchtest, gehst du wie folgt vor:
 
```bash
cd frontend-vite
npm test
```
 
---
 
## 8. Fehlerbehebung
 
- Stelle sicher, dass keine Ports (8080, 5173) bereits belegt sind.
- Prüfe, ob alle Voraussetzungen installiert sind.
- Bei Problemen hilft oft ein `npm install` bzw. `mvn clean install` erneut auszuführen.
- Prüfe die Zugangsdaten der MySQL Connection
- Prüfe ob du dich in den richtigen Ordnern befindest, das Backend startet nur, wenn du im Ordner /backend bist. `cd backend/m294_295_project` im VSCode / Codium Terminal. Das Frontend startet nur wenn du im Ordner /frontend-vite bist. `cd frontend-vite`
- Damit das Backend mit der Datenbank kommunizieren kann, muss die MySQL Workbench geöffnet sein. Stelle sicher, dass die Datenbank vorhanden und befüllt ist.
---
 