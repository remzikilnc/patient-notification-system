package com.msparent.seeder;

import com.msparent.model.Criteria;
import com.msparent.model.Template;
import com.msparent.model.patient.Gender;
import com.msparent.model.patient.NotificationType;
import com.msparent.service.CriteriaService;
import com.msparent.service.TemplateService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final CriteriaService criteriaService;
    private final TemplateService templateService;

    public DatabaseSeeder(CriteriaService criteriaService, TemplateService templateService) {
        this.criteriaService = criteriaService;
        this.templateService = templateService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Template 1
        Template template1 = Template.builder()
                .title("Test Template")
                .htmlMessage("<p>Test Template</p>")
                .textMessage("Test Template")
                .notificationTypes(Arrays.asList(NotificationType.SMS, NotificationType.EMAIL))
                .build();

        templateService.createTemplate(template1);


        // Criteria 1
        Criteria criteria1 = Criteria.builder()
                .minAge(10)
                .maxAge(30)
                .gender(Gender.MALE)
                .notificationTemplate(template1)
                .build();

        criteriaService.createCriteria(criteria1);


        // Template 2
        Template template2 = Template.builder()
                .title("Test Template 2")
                .htmlMessage("<p>Test Template 2</p>")
                .textMessage("Test Template 2")
                .notificationTypes(Arrays.asList(NotificationType.SMS, NotificationType.EMAIL))
                .build();

        templateService.createTemplate(template2);

        // Criteria 2
        Criteria criteria2 = Criteria.builder()
                .minAge(30)
                .maxAge(50)
                .gender(Gender.FEMALE)
                .notificationTemplate(template2)
                .build();

        criteriaService.createCriteria(criteria2);
    }

}
