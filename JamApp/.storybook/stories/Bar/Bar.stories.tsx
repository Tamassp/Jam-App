import React from 'react';
import Bar from '../../../src/components/Bar/Bar'

export default {
    title: 'Bar',
    component: Bar,
}

export const twoChords = () => <Bar chords={[{chordId: '1', name: 'C'}, {chordId: '2', name: 'G'}]} />

export const fourChords = () => <Bar chords={[{chordId: '1', name: 'C'}, {chordId: '2', name: 'G'}, {chordId: '3', name: 'Am'}, {chordId: '4', name: 'F'}]} />