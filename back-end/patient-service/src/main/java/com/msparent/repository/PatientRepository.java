package com.msparent.repository;

import com.msparent.model.Gender;
import com.msparent.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PatientRepository extends JpaRepository<Patient, Long>, JpaSpecificationExecutor<Patient> {
    @Query("SELECT p FROM Patient p WHERE " +
            "(:search IS NULL OR :search = '' OR " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(p.surname) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:surname IS NULL OR LOWER(p.surname) LIKE LOWER(CONCAT('%', :surname, '%'))) AND " +
            "(:ageFrom IS NULL OR (YEAR(CURRENT_DATE) - YEAR(p.birthdate)) + 1 >= :ageFrom) AND " +
            "(:ageTo IS NULL OR (YEAR(CURRENT_DATE) - YEAR(p.birthdate)) - 1 <= :ageTo) AND " +
            "(:gender IS NULL OR p.gender = :gender)")
    Page<Patient> searchCriteria(
            @Param("search") String search,
            @Param("name") String name,
            @Param("surname") String surname,
            @Param("ageFrom") Integer ageFrom,
            @Param("ageTo") Integer ageTo,
            @Param("gender") Gender gender,
            Pageable pageable
    );
}


