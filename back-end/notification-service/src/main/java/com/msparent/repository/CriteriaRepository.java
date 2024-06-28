package com.msparent.repository;

import com.msparent.model.Criteria;
import com.msparent.model.patient.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CriteriaRepository extends JpaRepository<Criteria, Long> {

    @Query("SELECT c FROM Criteria c WHERE " +
            "(:gender IS NULL OR c.gender = :gender) AND " +
            "(:age IS NULL OR (:age >= c.minAge AND :age <= c.maxAge))"
    )
    List<Criteria> checkIsCriteriaMet(@Param("gender") Gender gender, @Param("age") Integer age);
}
