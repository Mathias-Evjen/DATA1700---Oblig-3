package com.example.oblig3;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//@Entity
//@Table(name = "billett")
public class Billett {
    //@Id
    //@GeneratedValue
    private Long id;
    private String film;
    private int antall;
    private String fornavn;
    private String etternavn;
    private String tlf;
    private String epost;

    public Billett(String film, String antall, String fornavn, String etternavn, String tlf, String epost) {
        this.film = film;
        int intAntall = Integer.parseInt(antall);
        this.antall = intAntall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.tlf = tlf;
        this.epost = epost;
    }

    public Billett(Long id, String film, int antall, String fornavn, String etternavn, String tlf, String epost) {
        this.id = id;
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.tlf = tlf;
        this.epost = epost;
    }

    public Billett() {}

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getTlf() {
        return tlf;
    }

    public void setTlf(String tlf) {
        this.tlf = tlf;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Billett{" +
                "film='" + film + '\'' +
                ", antall=" + antall +
                ", fornavn='" + fornavn + '\'' +
                ", etternavn='" + etternavn + '\'' +
                ", tlf='" + tlf + '\'' +
                ", epost='" + epost + '\'' +
                '}';
    }
}
