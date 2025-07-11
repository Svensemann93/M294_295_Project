/*
Hier wird die Kategorie-Karte definiert, die eine Kategorie anzeigt und Optionen zum Bearbeiten oder Löschen bietet.
Die Karte enthält den Namen der Kategorie und zwei Buttons: einen zum Bearbeiten und einen zum Löschen der Kategorie.
Die Buttons rufen die entsprechenden Funktionen auf. Das Design der Karte wird durch eine separate CSS-Datei
gesteuert.
*/
import "../styles/components/CategoryCard.css";

/*
hier wird die Kategorie-Karte definiert, die eine Kategorie anzeigt und Optionen zum Bearbeiten oder Löschen bietet.
*/
export default function CategoryCard({ category, onDelete , onEdit }) {
  return (
    <div className="category-card">
      <h2>{category.name}</h2>

      <div className="card-actions">
        {/* typedef onEdit === 'function' prüft, ob die Funktion onEdit definiert ist. Wenn ja, wird der Bearbeiten-Button
            angezeigt. */}
            {typeof onEdit === 'function' && (
          <button /* hier wird die Editierfunktion definiert, die aufgerufen wird, wenn der Bearbeiten-Button geklickt wird
                    die Funktion onEdit wird mit der Kategorie als Argument aufgerufen. Vereinfacht gesagt, wenn der
                    Bearbeiten-Button geklickt wird, wird die onEdit-Funktion mit der Kategorie übergeben,
                     die bearbeitet werden soll. */
            className="edit-button"
            onClick={() => onEdit(category)}
          >
            Bearbeiten
          </button>
            )}

        {/* typedef onDelete === 'function' prüft, ob die Funktion onDelete definiert ist. Wenn ja, wird der Löschen-Button
            angezeigt. && der Button hat eine onClick-Funktion, die die onDelete-Funktion mit der ID der Kategorie aufruft,
            um die Kategorie zu löschen. */}
            {typeof onDelete === 'function' && (
          <button
            className="delete-button"
            onClick={() => onDelete(category.id)}
          >
            Löschen
          </button>
            )}
      </div>
    </div>
  );
}
