<?php

    include '../conexion/conexion.php';

class Bienes {
    
    
    private $id;
    private $direccion;
    private $ciudad;
    private $telefono;
    private $codigoPostal;
    private $tipo;
    private $precio;
    
    function __construct($id, $direccion, $ciudad,$telefono,$codigoPostal,$tipo,$precio) {
        $this->id = $id;
        $this->direccion = $direccion;
        $this->ciudad = $ciudad;
        $this->telefono = $telefono;
        $this->codigoPostal = $codigoPostal;
        $this->tipo = $tipo;
        $this->precio = $precio;
    }
    
    function getid() {
        return $this->id;
    }
    function getdireccion() {
        return $this->direccion;
    }
    function getciudad() {
        return $this->ciudad;
    }
    function gettelefono() {
        return $this->telefono;
    }
    function getcodigoPostal() {
        return $this->codigoPostal;
    }
    function gettipo() {
        return $this->tipo;
    }
    function getprecio() {
        return $this->precio;
    }

    //function para insertar bienes
    function guardarBienes(){
        

            //conexion a la bd
            $ConexionBD = new conexion();
            $link = $ConexionBD->conexion();

            $Select = "SELECT COUNT(*) AS EXISTE
                       FROM bienes
                       WHERE id = ".$this->id."";

            $resultado = $link->query($Select);
            
            while ($row=$resultado->fetch_assoc()) {
                
                $existe = $row['EXISTE'];
            }
            if($existe == 0){
                $insert = "INSERT INTO bienes(id,direccion,precio,ciudad,telefono,codigo_postal,tipo)
                            VALUES(".$this->id.",'".$this->direccion."','".$this->precio."','".$this->ciudad."','".$this->telefono."','".$this->codigoPostal."','".$this->tipo."')";

                $link->query($insert);

                print_r(1);
            }
            else  if($existe > 0){
                $update = "UPDATE bienes
                            SET direccion = '".$this->direccion."',
                            precio = '".$this->precio."',
                            ciudad = '".$this->ciudad."',
                            telefono = '".$this->telefono."',
                            codigo_postal = '".$this->codigoPostal."',
                            tipo = '".$this->tipo."'
                            WHERE id = ".$this->id."";
                 $link->query($update);

                            print_r(2);
            }
            else{
                print_r(3);
            }


           

            $link->close();

        
    }
    //funcion para listar los bienes
    function listarBienes(){
        

        $ConexionBD = new conexion();
        $link = $ConexionBD->conexion();

        $Select = "SELECT * FROM bienes";

        $resultado = $link->query($Select);
        
        while ($row=$resultado->fetch_assoc()) {
            
            $lista[] = $row;
        }

        $link->close();

        print_r(json_encode($lista));
    
    }
    function eliminarBienes(){
        
        $ConexionBD = new conexion();
        $link = $ConexionBD->conexion();

        $Select = "DELETE FROM bienes WHERE id = ".$this->id."";
        $link->query($Select);
       
        $link->close();

    }

    function descargarExcel(){
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition: attachment;filename=Reporte.xls");  
        header("Pragma:no-cache");
        header("Expires:0");
         // http://programarenphp.wordpress.com

        /******** CONECTAR CON BASE DE DATOS **************** */ 

        $ConexionBD = new conexion();
                
        $link = $ConexionBD->conexion();

				$Consulta = "SELECT * FROM bienes";
                $result = $link->query($Consulta);
        
        
            // verificamos que no haya error 
            if (! $result){
            echo "La consulta SQL contiene errores.".mssql_error();
            exit();
            }else {
             echo utf8_decode("<table border >
                <tr>
                    <td colspan='7' align='center' style='background:#F3F781'>
                        <b>LISTADO BIENES
                    </td>
                </tr>
                <tr>
                    <td align='center'>
                        id
                    </td>
                    <td align='center'>
                        direccion
                    </td>
                    <td align='center'>
                        ciudad
                    </td>
                    <td align='center'>
                        telefono
                    </td>
                    <td align='center'>
                        codigo postal
                    </td>
                    <td align='center'>
                        tipo
                    </td>
                    <td align='center'>
                        precio
                    </td>
                </tr>");
                //obtenemos los datos resultado de la consulta 
                while ($row = $result->fetch_assoc())
                {
                    echo "<tr><td width=\"auto\"><font face=\"verdana\">" . 
                    utf8_decode($row['id']) . "</font></td>";
                    echo "<td width=\"auto\"><font face=\"verdana\">" . 
                    utf8_decode($row['direccion']) . "</font></td>";
                    echo "<td width=\"auto\"><font face=\"verdana\">" . 
                    utf8_decode($row['ciudad']) . "</font></td>";
                    echo "<td width=\"auto\"><font face=\"verdana\">" . 
                    utf8_decode($row['telefono']) . "</font></td>";
                    echo "<td width=\"auto\"><font face=\"verdana\">" . 
                    utf8_decode($row['codigo_postal']) . "</font></td>";
                    echo "<td width=\"auto\"><font face=\"verdana\">" . 
                    utf8_decode($row['tipo']) . "</font></td>";
                    echo "<td width=\"auto\"><font face=\"verdana\">" . 
                    utf8_decode($row['precio']) . "</font></td></tr>"; 
                    }
                    echo "</table>";
                
            }
        
        
            $link->close();
    }

    
}