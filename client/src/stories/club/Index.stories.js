import React from 'react';
import Index from '../../components/Club/Index'

// This default export determines where your story goes in the story list
export default {
  title: 'Clubs/Index',
  component: Index,
};

const Template = () => <Index />;

export const Base = Template.bind({});

Base.args = {
  /* the args you need here will depend on your component */
};