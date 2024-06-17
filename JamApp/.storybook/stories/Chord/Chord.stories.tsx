import React from 'react';
import Chord from '../../../src/components/Chord/Chord'

export default {
    title: 'Chord',
    component: Chord,
    argTypes: { handleClick: { action: 'handleFocus' } }
}

const Template = args => <Chord {...args} />

export const Major = Template.bind({})
Major.args = {
    chordId: '1',
    name: 'C',
    type: 'Major',
}

export const Minor = Template.bind({})
Minor.args = {
    chordId: '2',
    name: 'Am',
    type: 'Minor',
}

export const Seventh = Template.bind({})
Seventh.args = {
    chordId: '3',
    name: 'G7',
    type: 'Seventh',
}

export const Diminished = Template.bind({})
Diminished.args = {
    chordId: '4',
    name: 'Ddim',
    type: 'Diminished',
}