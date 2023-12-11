import React, { createContext, useContext, useState } from 'react';

const InputContext = createContext();

export const useIDContext = () => useContext(InputContext);
