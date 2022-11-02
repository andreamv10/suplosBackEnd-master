<?php

    include '../models/modelo.php';

    $tipConsulta = $_REQUEST['tipConsulta'];

    switch($tipConsulta){
        case 1:

            $Id = $_REQUEST['Id'];        
            $direccion = $_REQUEST['direccion'];
            $ciudad =  $_REQUEST['ciudad'];
            $telefono = $_REQUEST['telefono'];
            $codigoPostal = $_REQUEST['codPostal'];
            $tipo = $_REQUEST['tipo'];
            $precio = $_REQUEST['precio']; 
                
            $bienes = new Bienes($Id, $direccion, $ciudad,$telefono,$codigoPostal,$tipo,$precio);
            $bienes->guardarBienes();

            break;
        case 2:

            $bienes = new Bienes("", "", "","","","","");
            $bienes->listarBienes();

            break;
        case 3:
            $Id = $_REQUEST['id'];   

            $bienes = new Bienes($Id, "", "","","","","");
            $bienes->eliminarBienes();

            break;
            case 4:
                $ciudad = $_REQUEST['ciudad'];   
                $tipo = $_REQUEST['tipo']; 
    
                $bienes = new Bienes("", "", $ciudad,"","",$tipo,"");
                $bienes->descargarExcel();
    
                break;
        default:
            echo'ocurrio un error';
        break;
    }

    
  

?>