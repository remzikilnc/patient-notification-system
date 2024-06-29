package com.msparent.dto.criteria;

import com.msparent.model.Template;
import com.msparent.model.patient.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaRequest {
    private Integer minAge;
    private Integer maxAge;
    private Gender gender;
    private Template notificationTemplate;
}
