import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Stack } from '@mui/material'
import React from 'react'

function Admin() {
  return (
    <Box height={"100vh"} pt={10}display={"flex"} justifyContent={"center"}
    justifyItems={"center"} >
        <Stack direction={"column"} justifyItems="center" >
    <Typography variant='h4' color={"primary.contrastText"} display={"flex"} justifyContent={"center"}>Admin Dashboard</Typography>
    <TableContainer component={Paper}  sx={{width:{xs:400, md:800}}}>
        <Table  aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={1}>User Id</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Last Name</TableCell>
              <TableCell colSpan={2}>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Make Admin</TableCell>
            </TableRow>
          </TableHead>
          </Table>
          </TableContainer>
          </Stack>
    </Box>
  )
}

export default Admin