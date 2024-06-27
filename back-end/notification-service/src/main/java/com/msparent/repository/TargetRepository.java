package com.msparent.repository;

import com.msparent.model.TargetPatients;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TargetRepository extends JpaRepository<TargetPatients, Long> {

}