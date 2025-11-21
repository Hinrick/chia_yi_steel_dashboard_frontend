'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  QrCode as QrCodeIcon,
} from '@mui/icons-material';

interface Employee {
  id: string;
  code: string;
  name: string;
  department: string;
  position: string;
  status: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      code: 'E001',
      name: '張三',
      department: '生產部',
      position: '作業員',
      status: '在職',
    },
    {
      id: '2',
      code: 'E002',
      name: '李四',
      department: '品管部',
      position: '品管員',
      status: '在職',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({});

  const handleOpen = (employee?: Employee) => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({});
  };

  const handleSave = () => {
    // TODO: Implement save logic with backend API
    console.log('Save employee:', formData);
    handleClose();
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete logic with backend API
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">員工管理</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          新增員工
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>員工編號</TableCell>
              <TableCell>姓名</TableCell>
              <TableCell>部門</TableCell>
              <TableCell>職位</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.code}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <QrCodeIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpen(employee)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {formData.id ? '編輯員工' : '新增員工'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="員工編號"
            value={formData.code || ''}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="姓名"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="部門"
            value={formData.department || ''}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            margin="normal"
          >
            <MenuItem value="生產部">生產部</MenuItem>
            <MenuItem value="品管部">品管部</MenuItem>
            <MenuItem value="倉儲部">倉儲部</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="職位"
            value={formData.position || ''}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="狀態"
            value={formData.status || ''}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            margin="normal"
          >
            <MenuItem value="在職">在職</MenuItem>
            <MenuItem value="離職">離職</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSave} variant="contained">
            儲存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
