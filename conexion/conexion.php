<?php
    class Conexion
    {
        /**
        * Gestiona la conexión con la base de datos
        */

        private $dbhost = 'localhost';

        private $dbuser = 'root';
        
        private $dbpass = '';

        private $dbname = 'intelcost_bienes';

        public function conexion () {

            /**
            * @return object link_id con la conexión
            */
            $link_id = new mysqli($this->dbhost,$this->dbuser,$this->dbpass,$this->dbname);
            if ($link_id ->connect_error) {
                echo "Error de Connexion ($link_id->connect_errno)
                $link_id->connect_error\n";
                header('Location: error-conexion.php');
                exit;
            } else {
                return $link_id;
            }
        }
    }
?>
