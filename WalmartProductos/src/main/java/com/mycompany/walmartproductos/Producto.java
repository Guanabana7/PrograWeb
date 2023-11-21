/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.walmartproductos;

/**
 *
 * @author Damian
 */
public class Producto {
    private String nombre;
    private String precio;
    private String descripcion;
    private String direccion;

    public Producto() {
    }

    public Producto(String nombre, String precio, String descripcion, String direccion) {
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.direccion = direccion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrecio() {
        return precio;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String Descripcion) {
        this.descripcion = Descripcion;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @Override
    public String toString() {
        return "Producto{" + "nombre=" + nombre + ", precio=" + precio + ", Descripcion=" + descripcion + ", direccion=" + direccion + '}';
    }
    
    
}
