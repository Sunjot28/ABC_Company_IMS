package com.invoice.invoicemanagementsystem.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.invoice.invoicemanagementsystem.entities.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    public Invoice findById(int id);

    public void deleteByIdIn(List<Integer> ids);

    @Query("SELECT i.amountInUsd FROM Invoice i WHERE i.distChan = :distChanParam")
    public List<Float> findAmountInUsdByDistChan(String distChanParam);

    @Query("SELECT i.amountInUsd FROM Invoice i WHERE i.custNum = :custNumParam")
    public List<Float> findAmountInUsdByCustNum(int custNumParam);

    @Query("SELECT i.amountInUsd FROM Invoice i WHERE i.distChan = :distChanParam AND i.custNum = :custNumParam")
    public List<Float> getAmountByDistChanAndCustNum(String distChanParam, int custNumParam);

    @Query("SELECT DISTINCT i.distChan from Invoice i ORDER BY i.distChan ASC")
    public List<String> findAllDistChan();

    @Query("SELECT DISTINCT i.custNum from Invoice i ORDER BY i.custNum ASC")
    public List<Integer> findAllCustNum();

    @Query("FROM Invoice i ORDER BY i.id DESC LIMIT 7")
    public List<Invoice> findRecentInvoices();
}
