package ch.wiss.m294_295_project.repository;

import ch.wiss.m294_295_project.model.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryModel, Integer> {
}
