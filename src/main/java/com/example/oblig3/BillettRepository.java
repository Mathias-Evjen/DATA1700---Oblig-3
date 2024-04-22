package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    class BillettRowMapper implements RowMapper< Billett > {
        @Override
        public Billett mapRow(ResultSet rs, int rowNum) throws SQLException {
            Billett billett = new Billett();
            billett.setId(rs.getLong("id"));
            billett.setFilm(rs.getString("film"));
            billett.setAntall(rs.getInt("antall"));
            billett.setFornavn(rs.getString("fornavn"));
            billett.setEtternavn(rs.getString("etternavn"));
            billett.setTlf(rs.getString("tlf"));
            billett.setEpost(rs.getString("epost"));
            return billett;
        }
    }
    public void lagreBillett(Billett billett) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, tlf, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTlf(), billett.getEpost());
    }

    public List<Billett> hentBilletter() {
        String sql = "SELECT * FROM Billett ORDER BY Etternavn";
        List<Billett> billetter = db.query(sql, new BillettRowMapper());
        return billetter;
    }

    public void slettAlleBilletter() {
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }

    public void slettbillett(Long id) {
        String sql = "DELETE FROM Billett WHERE id = ?";
        db.update(sql, id);
    }
}
