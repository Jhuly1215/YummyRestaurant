import express from 'express';
import cors from 'cors';
import pg from 'pg';
import fileUpload from 'express-fileupload';
import pkg from 'pg';

const { Pool } = pg;

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'yummmy',
  password: 'admin',
  port: 5432, // Puerto predeterminado de PostgreSQL
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});


//Para subir imagenes
app.use(fileUpload());
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  sampleFile = req.files.sampleFile;
  uploadPath = "./images/"+ sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});


//-----------USUARIOS----------
// Ruta para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM usuarios');
      client.release();
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Ruta para crear un nuevo usuario
  app.post('/api/usuarios', async (req, res) => {
    try {
      const { nombre, apellidos, correo, password, idRol } = req.body;
      const client = await pool.connect();
      await client.query(
        'INSERT INTO usuarios (nombre, apellidos, correo, password, idRol) VALUES ($1, $2, $3, $4, $5)',
        [nombre, apellidos, correo, password, idRol]
      );
      client.release();
      res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Ruta para actualizar un usuario existente
  app.put('/api/usuarios/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellidos, correo, password, idRol } = req.body;
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE usuarios SET nombre = $1, apellidos = $2, correo = $3, password = $4, idRol = $5 WHERE id = $6',
        [nombre, apellidos, correo, password, idRol, id]
      );
      client.release();
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Ruta para eliminar un usuario
  app.delete('/api/usuarios/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const client = await pool.connect();
      const result = await client.query('DELETE FROM usuarios WHERE id = $1', [id]);
      client.release();
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
 
  
  //------ROLES---------
   // Ruta para obtener todos los roles
   app.get('/api/roles', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM roles');
      client.release();
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  // Ruta para crear un nuevo rol
  app.post('/api/roles', async (req, res) => {
    try {
      const { nombre } = req.body;
      const client = await pool.connect();
      await client.query(
        'INSERT INTO roles (nombre) VALUES ($1)',
        [nombre]
      );
      client.release();
      res.status(201).json({ message: 'Rol creado correctamente' });
    } catch (error) {
      console.error('Error al crear el rol:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Ruta para actualizar un rol existente
  app.put('/api/roles/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE roles SET nombre = $1 WHERE id = $2',
        [nombre, id]
      );
      client.release();
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Rol actualizado correctamente' });
      } else {
        res.status(404).json({ error: 'Rol no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Ruta para eliminar un rol
  app.delete('/api/roles/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const client = await pool.connect();
      const result = await client.query('DELETE FROM roles WHERE id = $1', [id]);
      client.release();
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Rol eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Rol no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });



