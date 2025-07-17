package ch.wiss.m294_295_project.repository;

import ch.wiss.m294_295_project.model.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
Hier wird das Repository für die Kategorie-Modelle definiert. Das bedeutet, dass es CRUD-Operationen für die Kategorie-Modelle
bereitstellt.
Das Repository erbt von JpaRepository, was bedeutet, dass es bereits viele nützliche Methoden für die Datenbankoperationen enthält.
JpaRepository bietet bereits viele nützliche Methoden wie findAll(), findById(), save(), delete() usw
Die Kategorie-Modelle werden in der Datenbank gespeichert und verwaltet.
Integer ist der Typ des Primärschlüssels (ID) für die Kategorie-Modelle.
*/
@Repository
public interface CategoryRepository extends JpaRepository<CategoryModel, Integer> {
}
