package com.msparent.repository;

import com.msparent.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long>, PatientRepositoryCustom  {
    @Query("SELECT p FROM Patient p WHERE (:searchTerm IS NULL OR :searchTerm = '') OR (LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(p.surname) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Patient> search(@Param("searchTerm") String searchTerm, Pageable pageable);

    @Query("SELECT p FROM Patient p WHERE p.name = ?1")
    Patient findByName(String name);

    @Query("SELECT p FROM Patient p WHERE p.surname = ?1")
    Patient findBySurname(String surname);

    @Query(value = "SELECT * FROM Patient p WHERE TIMESTAMPDIFF(YEAR, p.birthdate, CURDATE()) = ?1", nativeQuery = true)
    Patient findByAge(int age);

    @Query("SELECT p FROM Patient p WHERE function('TIMESTAMPDIFF', 'YEAR', p.birthdate, CURRENT_DATE) BETWEEN :startAge AND :endAge")
    List<Patient> findByAgeBetween(int startAge, int endAge);
}
