package com.msparent.service;

import com.msparent.model.Criteria;
import com.msparent.model.patient.Gender;
import com.msparent.repository.CriteriaRepository;
import com.msparent.repository.TargetRepository;
import com.msparent.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CriteriaService {

    private final CriteriaRepository criteriaRepository;
    private final TargetRepository targetRepository;
    private final TemplateRepository templateRepository;

    public List<Criteria> getAllCriteria() {
        return criteriaRepository.findAll();
    }

    public Criteria getCriteria(Long id) {
        return criteriaRepository.findById(id).orElse(null);
    }

    public Criteria createCriteria(Criteria criteria) {
        return criteriaRepository.save(criteria);
    }

    public Criteria updateCriteria(Criteria criteria) {
        return criteriaRepository.save(criteria);
    }

    public void deleteCriteria(Criteria criteria) {
        criteriaRepository.delete(criteria);
    }

    public List<Criteria> checkIsCriteriaMet(Gender gender, int age) {
        return criteriaRepository.checkIsCriteriaMet(gender, age);
    }
}
