package com.msparent.dto.patient;

import com.msparent.model.Gender;
import lombok.Data;

@Data
public class PatientSearchCriteria {
    private String search;
    private String name;
    private String surname;
    private Integer ageFrom;
    private Integer ageTo;
    private Gender gender;
    private boolean contacts;
    //private LocalDate bornBefore;
    //private LocalDate bornAfter;
    private int pageNumber = 1;
    private int pageLimit = 10;
    private String[] sort = {"id", "desc"};
}
