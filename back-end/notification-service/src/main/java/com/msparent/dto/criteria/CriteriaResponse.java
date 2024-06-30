package com.msparent.dto.criteria;

import com.msparent.model.TargetPatients;
import com.msparent.model.Template;
import com.msparent.model.patient.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CriteriaResponse {
    private Long id;
    private Integer minAge;
    private Integer maxAge;
    private Gender gender;
    private Template notificationTemplate;
    private List<TargetPatients> targetPatients;
}
