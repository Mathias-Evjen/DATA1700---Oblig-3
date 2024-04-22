package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BillettController {
    @Autowired
    private BillettRepository billettRepository;

    @PostMapping("/lagreBillett")
    public void lagreBillett(Billett billett) {
        billettRepository.lagreBillett(billett);
    }

    @GetMapping("/hentBilletter")
    public List<Billett> hentAlleBilletter() {
        //System.out.println(billetter);
        List<Billett> billetter = billettRepository.hentBilletter();
        System.out.println("Mottatt foelgende billetter fra databasen" + billetter);
        return billetter;
    }

    @GetMapping("/slettAlleBilletter")
    public void slettAlleBilletter() {
        billettRepository.slettAlleBilletter();
    }

    @DeleteMapping("/slettBillett")
    public void slettBillett(Long id) {
        billettRepository.slettbillett(id);
    }
}
