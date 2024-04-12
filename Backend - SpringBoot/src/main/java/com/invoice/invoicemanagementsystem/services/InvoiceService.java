package com.invoice.invoicemanagementsystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invoice.invoicemanagementsystem.dao.InvoiceRepository;
import com.invoice.invoicemanagementsystem.entities.Invoice;

import jakarta.transaction.Transactional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        List<Invoice> invoices = (List<Invoice>) invoiceRepository.findAll();
        return invoices;
    }

    public Invoice getInvoiceById(int id) {
        Invoice invoice = invoiceRepository.findById(id);
        return invoice;
    }

    public Invoice addInvoice(Invoice invoice) {
        Invoice result = invoiceRepository.save(invoice);
        return result;
    }

    public void updateInvoice(Invoice invoice, int id) {
        Invoice newInvoice = invoiceRepository.findById(id);
        newInvoice.setOrderCurr(invoice.getOrderCurr());
        newInvoice.setCompCode(invoice.getCompCode());
        newInvoice.setDistChan(invoice.getDistChan());

        invoiceRepository.save(newInvoice);
    }

    @Transactional
    public void deleteInvoice(List<Integer> ids) {
        invoiceRepository.deleteByIdIn(ids);
    }

    public Float getAmountByDistChan(String distChanParam) {
        List<Float> amounts = invoiceRepository.findAmountInUsdByDistChan(distChanParam);
        float sum = 0;
        for (Float a : amounts) {
            sum = sum + a;
        }
        return sum;
    }

    public Float getAmountByCustNum(int custNumParam) {
        List<Float> amounts = invoiceRepository.findAmountInUsdByCustNum(custNumParam);
        float sum = 0;
        for (Float a : amounts) {
            sum = sum + a;
        }
        return sum;
    }

    public Float getAmountByDistChanAndCustNum(String distChanParam, int custNumParam) {
        List<Float> amounts = invoiceRepository.getAmountByDistChanAndCustNum(distChanParam, custNumParam);
        float sum = 0;
        for (Float a : amounts) {
            sum = sum + a;
        }
        return sum;
    }

    public List<String> getDistChanItems() {
        List<String> items = invoiceRepository.findAllDistChan();
        return items;
    }

    public List<Integer> getCustNumItems() {
        List<Integer> items = invoiceRepository.findAllCustNum();
        return items;
    }

    public List<Invoice> getRecentInvoices() {
        List<Invoice> invoices = invoiceRepository.findRecentInvoices();
        return invoices;
    }
}
