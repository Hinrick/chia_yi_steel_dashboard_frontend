'use client';

import { useState } from 'react';
import {
  Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Stack,
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, FilterList as FilterIcon,
} from '@mui/icons-material';
import { SpheroRecord, SpheroFormData, COOLING_METHODS, SPHERO_MATERIALS } from '@/types/spheroidizing';

const sampleData: SpheroRecord[] = [
  {
    id: 'SP-20251121-001',
    date: new Date('2025-11-21'),
    recorder: 'admin',
    furnaceNo: 'SF-01',
    batchNo: 'B001',
    material: 'FCD550',
    weight: 500,
    targetTemp: 900,
    actualTemp: 895,
    heatingTime: 2.5,
    holdingTime: 4,
    coolingMethod: '爐冷',
    coolingRate: 50,
    hardnessBefor: 250,
    hardnessAfter: 180,
    inspector: '李四',
    inspectionResult: '合格',
    remarks: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const initialFormData: SpheroFormData = {
  date: new Date(),
  recorder: 'admin',
  furnaceNo: '',
  batchNo: '',
  material: 'FCD550',
  weight: 0,
  targetTemp: 900,
  actualTemp: 0,
  heatingTime: 0,
  holdingTime: 0,
  coolingMethod: '爐冷',
  coolingRate: 50,
  hardnessBefor: 0,
  hardnessAfter: 0,
  inspector: '',
  inspectionResult: '合格',
  remarks: '',
};

export default function Page() {
  const [records, setRecords] = useState<SpheroRecord[]>(sampleData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState<SpheroRecord | null>(null);
  const [formData, setFormData] = useState<SpheroFormData>(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const handleOpenDialog = (record?: SpheroRecord) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        date: record.date,
        recorder: record.recorder,
        furnaceNo: record.furnaceNo,
        batchNo: record.batchNo,
        material: record.material,
        weight: record.weight,
        targetTemp: record.targetTemp,
        actualTemp: record.actualTemp,
        heatingTime: record.heatingTime,
        holdingTime: record.holdingTime,
        coolingMethod: record.coolingMethod,
        coolingRate: record.coolingRate,
        hardnessBefor: record.hardnessBefor,
        hardnessAfter: record.hardnessAfter,
        inspector: record.inspector,
        inspectionResult: record.inspectionResult,
        remarks: record.remarks,
      });
    } else {
      setEditingRecord(null);
      setFormData(initialFormData);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRecord(null);
    setFormData(initialFormData);
  };

  const handleSave = () => {
    if (editingRecord) {
      setRecords(records.map(r =>
        r.id === editingRecord.id
          ? { ...r, ...formData, updatedAt: new Date() }
          : r
      ));
    } else {
      const newRecord: SpheroRecord = {
        id: `SP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(records.length + 1).padStart(3, '0')}`,
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setRecords([...records, newRecord]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setRecordToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      setRecords(records.filter(r => r.id !== recordToDelete));
      setRecordToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const formatDate = (date: Date) => {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    return `${year}年${month}月${day}日 ${weekday}`;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          球化作業
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{ borderRadius: 1 }}
          >
            篩選
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              borderRadius: 1,
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' },
            }}
          >
            新增
          </Button>
        </Stack>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 600 }}>操作</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>日期</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>爐號</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>批號</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>材質</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>重量(kg)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>目標溫度</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>實際溫度</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>處理前硬度</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>處理後硬度</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>檢驗結果</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.id}
                sx={{
                  bgcolor: index % 2 === 0 ? 'background.paper' : 'grey.50',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(record)}
                      sx={{ color: 'primary.main' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(record.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell>{record.id}</TableCell>
                <TableCell>{formatDate(record.date)}</TableCell>
                <TableCell>{record.furnaceNo}</TableCell>
                <TableCell>{record.batchNo}</TableCell>
                <TableCell>{record.material}</TableCell>
                <TableCell>{record.weight}</TableCell>
                <TableCell>{record.targetTemp}°C</TableCell>
                <TableCell>{record.actualTemp}°C</TableCell>
                <TableCell>{record.hardnessBefor} HB</TableCell>
                <TableCell>{record.hardnessAfter} HB</TableCell>
                <TableCell>{record.inspectionResult}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2" color="text.secondary">
          共 {records.length} 筆
        </Typography>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          {editingRecord ? '編輯球化記錄' : '新增球化記錄'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <TextField
                label="日期"
                type="date"
                value={formData.date.toISOString().slice(0, 10)}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="記錄人"
                value={formData.recorder}
                onChange={(e) => setFormData({ ...formData, recorder: e.target.value })}
                fullWidth
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
              <TextField
                label="爐號"
                value={formData.furnaceNo}
                onChange={(e) => setFormData({ ...formData, furnaceNo: e.target.value })}
                fullWidth
              />
              <TextField
                label="批號"
                value={formData.batchNo}
                onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                fullWidth
              />
              <TextField
                label="材質"
                select
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                fullWidth
              >
                {SPHERO_MATERIALS.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="重量(kg)"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                fullWidth
              />
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>溫度參數</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
              <TextField
                label="目標溫度(°C)"
                type="number"
                value={formData.targetTemp}
                onChange={(e) => setFormData({ ...formData, targetTemp: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="實際溫度(°C)"
                type="number"
                value={formData.actualTemp}
                onChange={(e) => setFormData({ ...formData, actualTemp: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="加熱時間(小時)"
                type="number"
                value={formData.heatingTime}
                onChange={(e) => setFormData({ ...formData, heatingTime: Number(e.target.value) })}
                fullWidth
                inputProps={{ step: 0.1 }}
              />
              <TextField
                label="保溫時間(小時)"
                type="number"
                value={formData.holdingTime}
                onChange={(e) => setFormData({ ...formData, holdingTime: Number(e.target.value) })}
                fullWidth
                inputProps={{ step: 0.1 }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>冷卻參數</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
              <TextField
                label="冷卻方式"
                select
                value={formData.coolingMethod}
                onChange={(e) => setFormData({ ...formData, coolingMethod: e.target.value })}
                fullWidth
              >
                {COOLING_METHODS.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="冷卻速度(°C/h)"
                type="number"
                value={formData.coolingRate}
                onChange={(e) => setFormData({ ...formData, coolingRate: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="處理前硬度(HB)"
                type="number"
                value={formData.hardnessBefor}
                onChange={(e) => setFormData({ ...formData, hardnessBefor: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="處理後硬度(HB)"
                type="number"
                value={formData.hardnessAfter}
                onChange={(e) => setFormData({ ...formData, hardnessAfter: Number(e.target.value) })}
                fullWidth
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <TextField
                label="檢驗人員"
                value={formData.inspector}
                onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                fullWidth
              />
              <TextField
                label="檢驗結果"
                select
                value={formData.inspectionResult}
                onChange={(e) => setFormData({ ...formData, inspectionResult: e.target.value })}
                fullWidth
              >
                <MenuItem value="合格">合格</MenuItem>
                <MenuItem value="不合格">不合格</MenuItem>
                <MenuItem value="待複檢">待複檢</MenuItem>
              </TextField>
            </Box>

            <TextField
              label="備註"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSave} variant="contained">
            儲存
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>確認刪除</DialogTitle>
        <DialogContent>
          <Typography>確定要刪除此筆記錄嗎？此操作無法復原。</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>取消</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
