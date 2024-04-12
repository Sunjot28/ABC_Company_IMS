package com.invoice.invoicemanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.invoice.invoicemanagementsystem.entities.Invoice;
import com.invoice.invoicemanagementsystem.services.InvoiceService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getInvoices() {
        List<Invoice> invoices = invoiceService.getAllInvoices();
        if (invoices.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(invoices);
    }

    @GetMapping("/invoices/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable("id") int id) {
        try {
            Invoice invoice = invoiceService.getInvoiceById(id);
            return ResponseEntity.ok().body(invoice);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/invoices/analytics/distChan/{distChanParam}")
    public ResponseEntity<Float> getAmountByDistChan(@PathVariable("distChanParam") String distChanParam) {
        try {
            Float sum = invoiceService.getAmountByDistChan(distChanParam);
            return ResponseEntity.ok().body(sum);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/invoices/analytics/custNum/{custNumParam}")
    public ResponseEntity<Float> getAmountByCustNum(@PathVariable("custNumParam") int custNumParam) {
        try {
            Float sum = invoiceService.getAmountByCustNum(custNumParam);
            return ResponseEntity.ok().body(sum);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/invoices/analytics/{distChanParam}/{custNumParam}")
    public ResponseEntity<Float> getAmountByDistChanAndCustNum(@PathVariable("distChanParam") String distChanParam,
            @PathVariable("custNumParam") int custNumParam) {
        try {
            Float sum = invoiceService.getAmountByDistChanAndCustNum(distChanParam, custNumParam);
            return ResponseEntity.ok().body(sum);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/invoices/distChan/items")
    public ResponseEntity<List<String>> getDistChanItems() {
        try {
            List<String> items = invoiceService.getDistChanItems();
            return ResponseEntity.ok().body(items);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/invoices/custNum/items")
    public ResponseEntity<List<Integer>> getCustNumItems() {
        try {
            List<Integer> items = invoiceService.getCustNumItems();
            return ResponseEntity.ok().body(items);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/invoices/recent")
    public ResponseEntity<List<Invoice>> getRecentInvoices() {
        List<Invoice> invoices = invoiceService.getRecentInvoices();
        if (invoices.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(invoices);
    }
    
    @PostMapping("/invoices")
    public ResponseEntity<Invoice> addInvoice(@RequestBody Invoice invoice) {
        Invoice i = null;
        try {
            i = invoiceService.addInvoice(invoice);
            return ResponseEntity.ok().body(i);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/invoices/{id}")
    public ResponseEntity<Void> updateInvoice(@RequestBody Invoice invoice, @PathVariable("id") int id) {
        try {
            invoiceService.updateInvoice(invoice, id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/invoices/{ids}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable("ids") List<Integer> ids) {
        try {
            invoiceService.deleteInvoice(ids);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
