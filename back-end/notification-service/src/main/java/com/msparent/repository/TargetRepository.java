package com.msparent.repository;

import com.msparent.model.TargetPatients;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TargetRepository extends JpaRepository<TargetPatients, Long> {
    Optional<TargetPatients> findByPatientIdAndCriteriaId(Long patientId, Long criteriaId);

}