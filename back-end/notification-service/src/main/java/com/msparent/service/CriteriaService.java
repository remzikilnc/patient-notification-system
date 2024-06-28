package com.msparent.service;

import com.msparent.model.Criteria;
import com.msparent.model.TargetPatients;
import com.msparent.model.Template;
import com.msparent.model.patient.Gender;
import com.msparent.model.patient.PatientDTO;
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
ææ
    public void checkIsCriteriaMet(PatientDTO patient) {
       if (patient.getAge() > 20){
           log.info("Patient: {}", patient);

           Template template = Template.builder().message("Template 1").build();
           templateRepository.save(template);


           Criteria criteria = Criteria.builder().minAge(15).maxAge(100).notificationTemplate(template).build();
           criteriaRepository.save(criteria);



            TargetPatients targetPatients = TargetPatients.builder()
                    .criteria(criteria)
                    .patient_id(patient.getId())
                    .build();

            targetRepository.save(targetPatients);
        }
    }
}
