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
import { QuenchRecord, QuenchFormData, NODULIZER_TYPES, INOCULANT_TYPES, QUENCH_MATERIALS } from '@/types/quenching';

const sampleData: QuenchRecord[] = [
  {
    id: 'QC-20251121-001',
    date: new Date('2025-11-21'),
    recorder: 'admin',
    ladleNo: 'L-001',
    castingNo: 'C-2025-001',
    material: 'FCD550',
    weight: 800,
    temperature: 1450,
    nodulizer: '鎂合金',
    nodulizerAmount: 12,
    inoculant: '75矽鐵',
    inoculantAmount: 8,
    reactionTime: 120,
    residualMg: 0.045,
    nodularity: 92,
    noduleCount: 250,
    inspector: '王五',
    inspectionResult: '合格',
    remarks: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const initialFormData: QuenchFormData = {
  date: new Date(),
  recorder: 'admin',
  ladleNo: '',
  castingNo: '',
  material: 'FCD550',
  weight: 0,
  temperature: 1450,
  nodulizer: '鎂合金',
  nodulizerAmount: 0,
  inoculant: '75矽鐵',
  inoculantAmount: 0,
  reactionTime: 0,
  residualMg: 0,
  nodularity: 0,
  noduleCount: 0,
  inspector: '',
  inspectionResult: '合格',
  remarks: '',
};

export default function Page() {
  const [records, setRecords] = useState<QuenchRecord[]>(sampleData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState<QuenchRecord | null>(null);
  const [formData, setFormData] = useState<QuenchFormData>(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const handleOpenDialog = (record?: QuenchRecord) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        date: record.date,
        recorder: record.recorder,
        ladleNo: record.ladleNo,
        castingNo: record.castingNo,
        material: record.material,
        weight: record.weight,
        temperature: record.temperature,
        nodulizer: record.nodulizer,
        nodulizerAmount: record.nodulizerAmount,
        inoculant: record.inoculant,
        inoculantAmount: record.inoculantAmount,
        reactionTime: record.reactionTime,
        residualMg: record.residualMg,
        nodularity: record.nodularity,
        noduleCount: record.noduleCount,
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
      const newRecord: QuenchRecord = {
        id: `QC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(records.length + 1).padStart(3, '0')}`,
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
          淬注作業
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
              <TableCell sx={{ fontWeight: 600 }}>鐵水包號</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>澆注編號</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>材質</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>重量(kg)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>溫度(°C)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>球化率(%)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>殘餘鎂(%)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>球數</TableCell>
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
                <TableCell>{record.ladleNo}</TableCell>
                <TableCell>{record.castingNo}</TableCell>
                <TableCell>{record.material}</TableCell>
                <TableCell>{record.weight}</TableCell>
                <TableCell>{record.temperature}°C</TableCell>
                <TableCell>{record.nodularity}%</TableCell>
                <TableCell>{record.residualMg}%</TableCell>
                <TableCell>{record.noduleCount} 個/mm²</TableCell>
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
          {editingRecord ? '編輯淬注記錄' : '新增淬注記錄'}
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

            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>澆注資訊</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, mb: 3 }}>
              <TextField
                label="鐵水包號"
                value={formData.ladleNo}
                onChange={(e) => setFormData({ ...formData, ladleNo: e.target.value })}
                fullWidth
              />
              <TextField
                label="澆注編號"
                value={formData.castingNo}
                onChange={(e) => setFormData({ ...formData, castingNo: e.target.value })}
                fullWidth
              />
              <TextField
                label="材質"
                select
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                fullWidth
              >
                {QUENCH_MATERIALS.map((m) => (
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
              <TextField
                label="溫度(°C)"
                type="number"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: Number(e.target.value) })}
                fullWidth
              />
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>添加劑</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
              <TextField
                label="球化劑種類"
                select
                value={formData.nodulizer}
                onChange={(e) => setFormData({ ...formData, nodulizer: e.target.value })}
                fullWidth
              >
                {NODULIZER_TYPES.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="球化劑用量(kg)"
                type="number"
                value={formData.nodulizerAmount}
                onChange={(e) => setFormData({ ...formData, nodulizerAmount: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="孕育劑種類"
                select
                value={formData.inoculant}
                onChange={(e) => setFormData({ ...formData, inoculant: e.target.value })}
                fullWidth
              >
                {INOCULANT_TYPES.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="孕育劑用量(kg)"
                type="number"
                value={formData.inoculantAmount}
                onChange={(e) => setFormData({ ...formData, inoculantAmount: Number(e.target.value) })}
                fullWidth
              />
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>品質檢測</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
              <TextField
                label="反應時間(秒)"
                type="number"
                value={formData.reactionTime}
                onChange={(e) => setFormData({ ...formData, reactionTime: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="殘餘鎂(%)"
                type="number"
                value={formData.residualMg}
                onChange={(e) => setFormData({ ...formData, residualMg: Number(e.target.value) })}
                fullWidth
                inputProps={{ step: 0.001 }}
              />
              <TextField
                label="球化率(%)"
                type="number"
                value={formData.nodularity}
                onChange={(e) => setFormData({ ...formData, nodularity: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="球數(個/mm²)"
                type="number"
                value={formData.noduleCount}
                onChange={(e) => setFormData({ ...formData, noduleCount: Number(e.target.value) })}
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
          <Typography>確定要刪除此筆記錄嗎?此操作無法復原。</Typography>
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
