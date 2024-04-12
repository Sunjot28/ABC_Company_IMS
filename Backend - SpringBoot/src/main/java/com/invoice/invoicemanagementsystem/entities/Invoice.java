package com.invoice.invoicemanagementsystem.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "invoice_table")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    @Column(name = "sl_no")
    private int id;

    @Column(name = "cust_order_id")
    private int custOrderId;

    @Column(name = "sales_org")
    private int salesOrg;

    @Column(name = "dist_chan")
    private String distChan;

    @Column(name = "cust_num")
    private int custNum;

    @Column(name = "comp_code")
    private int compCode;

    @Column(name = "order_curr")
    private String orderCurr;

    @Column(name = "amount_in_usd")
    private float amountInUsd;

    @Column(name = "order_creation_date")
    private String orderCreationDate;

    public Invoice() {
    }

    public Invoice(int id, int custOrderId, int salesOrg, String distChan, int custNum, int compCode,
            String orderCurr, float amountInUsd, String orderCreationDate) {
        this.id = id;
        this.custOrderId = custOrderId;
        this.salesOrg = salesOrg;
        this.distChan = distChan;
        this.custNum = custNum;
        this.compCode = compCode;
        this.orderCurr = orderCurr;
        this.amountInUsd = amountInUsd;
        this.orderCreationDate = orderCreationDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCustOrderId() {
        return custOrderId;
    }

    public void setCustOrderId(int custOrderId) {
        this.custOrderId = custOrderId;
    }

    public int getSalesOrg() {
        return salesOrg;
    }

    public void setSalesOrg(int salesOrg) {
        this.salesOrg = salesOrg;
    }

    public String getDistChan() {
        return distChan;
    }

    public void setDistChan(String distChan) {
        this.distChan = distChan;
    }

    public int getCustNum() {
        return custNum;
    }

    public void setCustNum(int custNum) {
        this.custNum = custNum;
    }

    public int getCompCode() {
        return compCode;
    }

    public void setCompCode(int compCode) {
        this.compCode = compCode;
    }

    public String getOrderCurr() {
        return orderCurr;
    }

    public void setOrderCurr(String orderCurr) {
        this.orderCurr = orderCurr;
    }

    public float getAmountInUsd() {
        return amountInUsd;
    }

    public void setAmountInUsd(float amountInUsd) {
        this.amountInUsd = amountInUsd;
    }

    public String getOrderCreationDate() {
        return orderCreationDate;
    }

    public void setOrderCreationDate(String orderCreationDate) {
        this.orderCreationDate = orderCreationDate;
    }

    @Override
    public String toString() {
        return "Invoice [id=" + id + ", custOrderId=" + custOrderId + ", salesOrg=" + salesOrg
                + ", distChan=" + distChan + ", custNum=" + custNum + ", compCode=" + compCode + ", orderCurr="
                + orderCurr + ", amountInUsd=" + amountInUsd + ", orderCreationDate=" + orderCreationDate
                + "]";
    }
}
