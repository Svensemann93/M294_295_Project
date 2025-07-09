package ch.wiss.m294_295_project.repository;

import ch.wiss.m294_295_project.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
@Repository bedeutet, dass diese Schnittstelle ein Repository ist, das von Spring verwaltet wird.Spring erkennt
diese Schnittstelle und erstellt automatisch eine Implementierung für uns ,die die CRUD-Operationen
(Create, Read, Update, Delete) für die Product-Entität bereitstellt. Es ist eine gute Praxis, Repositories in Spring zu verwenden,
da sie die Interaktion mit der Datenbank vereinfachen und die Trennung von Geschäftslogik und Datenzugriff fördern.
Dieses Interface erweitert JpaRepository, um CRUD-Operationen für die Product-Entität zu ermöglichen.
JpaRepository bietet bereits viele nützliche Methoden wie findAll(), findById(), save(), delete() usw.
*/
@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Integer> {
}
