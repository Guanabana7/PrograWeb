-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
  `idUsuario` INT NOT NULL,
  `Correo` VARCHAR(255) NULL,
  `Contraseña` VARCHAR(255) NULL,
  `Nombre` VARCHAR(45) NULL,
  `Telefono` VARCHAR(45) NULL,
  `Apellidos` VARCHAR(45) NULL,
  `FechaNacimiento` DATE NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`DatosEnvio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`DatosEnvio` (
  `idDatosEnvio` INT NOT NULL,
  `Usuarios_idUsuario` INT NOT NULL,
  `Calle` VARCHAR(45) NULL,
  `Colonia` VARCHAR(45) NULL,
  `Numero` VARCHAR(45) NULL,
  `CodigoPostal` VARCHAR(45) NULL,
  PRIMARY KEY (`idDatosEnvio`),
  INDEX `fk_DatosEnvio_Usuarios1_idx` (`Usuarios_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_DatosEnvio_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuario`)
    REFERENCES `mydb`.`Usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Producto` (
  `idProducto` INT NOT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Descripcion` VARCHAR(45) NULL,
  `Precio` VARCHAR(45) NULL,
  PRIMARY KEY (`idProducto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Categoria` (
  `idCategoria` INT NOT NULL,
  `Nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Servicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Servicio` (
  `idServicio` INT NOT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Compañia` VARCHAR(45) NULL,
  `Precio` VARCHAR(45) NULL,
  PRIMARY KEY (`idServicio`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pedido` (
  `idPedido` INT NOT NULL,
  `Usuarios_idUsuario` INT NOT NULL,
  `FechaEntrega` DATETIME(5) NULL,
  `Precio` VARCHAR(45) NULL,
  PRIMARY KEY (`idPedido`),
  INDEX `fk_Pedido_Usuarios1_idx` (`Usuarios_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Pedido_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuario`)
    REFERENCES `mydb`.`Usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CategoriaProductos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CategoriaProductos` (
  `idCategoriaProductos` INT NOT NULL,
  `Producto_idProducto` INT NOT NULL,
  `Categoria_idCategoria` INT NOT NULL,
  PRIMARY KEY (`idCategoriaProductos`),
  INDEX `fk_CategoriaProductos_Producto1_idx` (`Producto_idProducto` ASC) VISIBLE,
  INDEX `fk_CategoriaProductos_Categoria1_idx` (`Categoria_idCategoria` ASC) VISIBLE,
  CONSTRAINT `fk_CategoriaProductos_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `mydb`.`Producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CategoriaProductos_Categoria1`
    FOREIGN KEY (`Categoria_idCategoria`)
    REFERENCES `mydb`.`Categoria` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FotosProducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FotosProducto` (
  `idFotosProducto` INT NOT NULL,
  `Direccion` VARCHAR(45) NULL,
  `Producto_idProducto` INT NOT NULL,
  PRIMARY KEY (`idFotosProducto`),
  INDEX `fk_FotosProducto_Producto1_idx` (`Producto_idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_FotosProducto_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `mydb`.`Producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PedidoServicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PedidoServicio` (
  `idPedidoServicio` INT NOT NULL,
  `Servicio_idServicio` INT NOT NULL,
  `Pedido_idPedido` INT NOT NULL,
  PRIMARY KEY (`idPedidoServicio`),
  INDEX `fk_PedidoServicio_Servicio1_idx` (`Servicio_idServicio` ASC) VISIBLE,
  INDEX `fk_PedidoServicio_Pedido1_idx` (`Pedido_idPedido` ASC) VISIBLE,
  CONSTRAINT `fk_PedidoServicio_Servicio1`
    FOREIGN KEY (`Servicio_idServicio`)
    REFERENCES `mydb`.`Servicio` (`idServicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PedidoServicio_Pedido1`
    FOREIGN KEY (`Pedido_idPedido`)
    REFERENCES `mydb`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PedidoProducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PedidoProducto` (
  `idPedidoProducto` INT NOT NULL,
  `Pedido_idPedido` INT NOT NULL,
  `Producto_idProducto` INT NOT NULL,
  PRIMARY KEY (`idPedidoProducto`),
  INDEX `fk_PedidoProducto_Pedido1_idx` (`Pedido_idPedido` ASC) VISIBLE,
  INDEX `fk_PedidoProducto_Producto1_idx` (`Producto_idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_PedidoProducto_Pedido1`
    FOREIGN KEY (`Pedido_idPedido`)
    REFERENCES `mydb`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PedidoProducto_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `mydb`.`Producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
