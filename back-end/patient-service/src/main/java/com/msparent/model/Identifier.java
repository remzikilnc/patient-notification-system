package com.msparent.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import java.util.Objects;

@Getter
@Embeddable
public class Identifier {
    private String value;
    private String type;

    public Identifier() {
    }

    public Identifier(String value, String type) {
        this.value = value;
        this.type = type;
    }

}
